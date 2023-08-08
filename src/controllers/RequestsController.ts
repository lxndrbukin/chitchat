import { Request, Response } from 'express';
import { controller, use, get, post } from './decorators';
import { requireAuth } from './middlewares';
import { RequestAction } from './types';
import FriendReqs from '../models/FriendRequests';
import FriendsList from '../models/FriendsList';

@controller('/_api')
class RequestsController {
  @get('/friend_requests/:userId')
  @use(requireAuth)
  async getFriendRequests(req: Request, res: Response) {
    if (req.session) {
      const currentUserReqs = await FriendReqs.findOne({ userId: req.params.userId }).select('-_id -__v');
      if (currentUserReqs) {
        res.send({
          sent: currentUserReqs.sent,
          received: currentUserReqs.received
        });
      }
    }
  }

  @post('/friend_requests')
  async postFriendRequest(req: Request, res: Response) {
    if (req.session) {
      const currentUserReqs = await FriendReqs.findOne({ userId: req.session.id });
      const otherUserReqs = await FriendReqs.findOne({ userId: req.body.userId });
      const sessionUser = {
        userId: req.session.id,
        fullName: {
          firstName: req.session.fullName.firstName,
          lastName: req.session.fullName.lastName
        }
      };
      const otherUser = {
        userId: req.body.userId,
        fullName: {
          firstName: req.body.firstName,
          lastName: req.body.lastName
        }
      };
      if (req.body.requestAction === RequestAction.Send) {
        if (!currentUserReqs && !otherUserReqs) {
          await FriendReqs.create({
            userId: req.session.id, sent: [otherUser]
          });
          await FriendReqs.create({
            userId: req.body.userId, received: [sessionUser]
          });
        } else if (currentUserReqs && !otherUserReqs) {
          await currentUserReqs.updateOne({ $push: { sent: otherUser } });
          await FriendReqs.create({ userId: req.body.userId, received: [sessionUser] });
        } else if (!currentUserReqs && otherUserReqs) {
          await FriendReqs.create({ userId: req.session.id, sent: [otherUser] });
          await otherUserReqs.updateOne({ $push: { received: sessionUser } });
        }
      } else if (req.body.requestAction === RequestAction.Accept || req.body.requestAction === RequestAction.Decline) {
        await currentUserReqs?.updateOne({ $pull: { received: otherUser } });
        await otherUserReqs?.updateOne({ $pull: { sent: sessionUser } });
      } else if (req.body.requestAction === RequestAction.Cancel) {
        await currentUserReqs?.updateOne({ $pull: { sent: otherUser } });
        await otherUserReqs?.updateOne({ $pull: { received: sessionUser } });
      }
    }
    return;
  }
  @get('/friends_list/:userId')
  @use(requireAuth)
  async getFriendsList(req: Request, res: Response) {
    if (req.session) {
      const friendsList = await FriendsList.findOne({ userId: req.params.userId }).select('-_id -__v');
      if (friendsList) {
        res.send(friendsList);
      }
    }
  }

  async postFriendsList(req: Request, res: Response) {
    if (req.session) {
      const currentUserList = await FriendsList.findOne({ userId: req.session.id });
      const otherUserList = await FriendsList.findOne({ userId: req.body.userId });
      const sessionUser = {
        userId: req.session.id,
        fullName: {
          firstName: req.session.fullName.firstName,
          lastName: req.session.fullName.lastName
        }
      };
      const otherUser = {
        userId: req.body.userId,
        fullName: {
          firstName: req.body.firstName,
          lastName: req.body.lastName
        }
      };
      if (!currentUserList && !otherUserList) {
        await FriendsList.create({ userId: req.session.id, friendsList: [otherUser] });
        await FriendsList.create({ userId: req.body.userId, friendsList: [sessionUser] });
      } else if (currentUserList && !otherUserList) {
        await currentUserList.updateOne({ $push: { friendsList: otherUser } });
        await FriendsList.create({ userId: req.body.userId, friendsList: [sessionUser] });
      }
    }
  }
}