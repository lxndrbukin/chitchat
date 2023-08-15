import { Request, Response } from 'express';
import { controller, use, get, post } from './decorators';
import { requireAuth } from './middlewares';
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
      if (req.body.requestAction === 'Send') {
        if (currentUserReqs) {
          await currentUserReqs.updateOne({ $push: { sent: otherUser } });
        } else {
          await FriendReqs.create({ userId: req.session.id, sent: [otherUser] });
        }
        if (otherUserReqs) {
          await otherUserReqs.updateOne({ $push: { received: sessionUser } });
        } else {
          await FriendReqs.create({ userId: req.body.userId, received: [sessionUser] });
        }
      } else if (req.body.requestAction === 'Accept' || req.body.requestAction === 'Decline') {
        await currentUserReqs?.updateOne({ $pull: { received: otherUser } });
        await otherUserReqs?.updateOne({ $pull: { sent: sessionUser } });
      } else if (req.body.requestAction === 'Cancel') {
        await currentUserReqs?.updateOne({ $pull: { sent: otherUser } });
        await otherUserReqs?.updateOne({ $pull: { received: sessionUser } });
      }
      return res.send({ ...otherUser, requestAction: req.body.requestAction });
    }
  }
  @get('/friends_list/:userId')
  @use(requireAuth)
  async getFriendsList(req: Request, res: Response) {
    if (req.session) {
      const friendsListInstance = await FriendsList.findOne({ userId: req.params.userId }).select('-_id -__v');
      if (friendsListInstance) {
        return res.send(friendsListInstance.friendsList);
      }
    }
  }

  @post('/friends_list')
  async postFriendsList(req: Request, res: Response) {
    if (req.session) {
      let currentUserList = await FriendsList.findOne({ userId: req.session.id });
      let otherUserList = await FriendsList.findOne({ userId: req.body.userId });
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
      if (req.body.requestAction === 'Add') {
        if (currentUserList) {
          await currentUserList.updateOne({ $push: { friendsList: otherUser } });
        } else {
          await FriendsList.create({ userId: req.session.id, friendsList: [otherUser] });
        }
        if (otherUserList) {
          await otherUserList.updateOne({ $push: { friendsList: sessionUser } });
        } else {
          await FriendsList.create({ userId: req.body.userId, friendsList: [sessionUser] });
        }
      } else if (req.body.requestAction === 'Remove') {
        await currentUserList?.updateOne({ $pull: { friendsList: otherUser } });
        await otherUserList?.updateOne({ $pull: { friendsList: sessionUser } });
      }
      currentUserList = await FriendsList.findOne({ userId: req.session.id });
      return res.send(currentUserList?.friendsList);
    }
  }
}