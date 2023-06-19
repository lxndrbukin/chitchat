import { Request, Response } from 'express';
import { controller, get, post, use } from './decorators';
import User, { IUser } from '../models/User';
import FriendReqs from '../models/FriendRequests';
import { requireAuth } from './middlewares';

@controller('/_api')
class APIController {
  @get('/users')
  @use(requireAuth)
  async getAllUsers(req: Request, res: Response) {
    const users: IUser[] = await User.find().select('-password -__v');
    res.send(users);
  }

  @get('/friend_requests')
  @use(requireAuth)
  async getFriendRequests(req: Request, res: Response) {
    if (req.session) {
      const currentUserReqs = await FriendReqs.find({ userId: req.session.id }).select('-_id -__v');
      res.send(currentUserReqs);
    }
  }

  @post('/friend_requests')
  async postFriendRequest(req: Request, res: Response) {
    if (req.session) {
      const currentUserReqs = await FriendReqs.findOne({ userId: req.session.id });
      const userReqs = await FriendReqs.findOne({ userId: req.body.userId });
      if (!currentUserReqs && !userReqs) {
        await FriendReqs.create({ userId: req.session.id, sent: [req.body.userId] });
        await FriendReqs.create({ userId: req.body.userId, received: [req.session.id] });
      } else if (currentUserReqs && !userReqs) {
        await currentUserReqs.updateOne({ $push: { sent: [req.body.userId] } });
        await FriendReqs.create({ userId: req.body.userId, received: [req.session.id] });
      } else if (!currentUserReqs && userReqs) {
        await FriendReqs.create({ userId: req.session.id, sent: [req.body.userId] });
        await userReqs.updateOne({ $push: { received: req.session.id } });
      }
    }
    res.redirect('/_api/users');
  }
}