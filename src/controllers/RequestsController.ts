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
      const userReqs = await FriendReqs.findOne({ userId: req.body.userId });
      const sessionUser = {
        userId: req.session.id,
        fullName: {
          firstName: req.session.fullName.firstName,
          lastName: req.session.fullName.lastName
        }
      };
      const addedUser = {
        userId: req.body.userId,
        fullName: {
          firstName: req.body.firstName,
          lastName: req.body.lastName
        }
      };
      if (!currentUserReqs && !userReqs) {
        await FriendReqs.create({
          userId: req.session.id, sent: [addedUser]
        });
        await FriendReqs.create({
          userId: req.body.userId, received: [sessionUser]
        });
      } else if (currentUserReqs && !userReqs) {
        await currentUserReqs.updateOne({ $push: { sent: addedUser } });
        await FriendReqs.create({ userId: req.body.userId, received: [sessionUser] });
      } else if (!currentUserReqs && userReqs) {
        await FriendReqs.create({ userId: req.session.id, sent: [addedUser] });
        await userReqs.updateOne({ $push: { received: sessionUser } });
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
}