import { Request, Response } from 'express';
import { controller, use, get, post } from './decorators';
import { requireAuth, checkAccess } from './middlewares';
import { UserRoles } from './types';
import FriendReqs from '../models/FriendRequests';

@controller('/_api')
class RequestsController {
  @get('/friend_requests/:userId')
  @use(requireAuth)
  async getFriendRequests(req: Request, res: Response) {
    if (req.session) {
      const currentUserReqs = await FriendReqs.find({ userId: req.params.userId }).select('-_id -__v');
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