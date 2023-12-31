import { Request, Response } from 'express';
import { controller, use, get } from './decorators';
import { requireAuth } from './middlewares';
import { IUser } from '../models/types';
import User from '../models/User';

@controller('/_api')
class UserController {
  @get('/current_user')
  @use(requireAuth)
  async getCurrentUser(req: Request, res: Response) {
    if (req.session && req.session.id) {
      const currentUser = await User.findOne({ _id: req.session.id }).select('-password -email -__v');
      if (currentUser) {
        res.send(currentUser);
      }
    }
  }

  @get('/users/:userId')
  async getUser(req: Request, res: Response) {
    if (req.params && req.params.userId) {
      const user = await User.findOne({ _id: req.params.userId }).select('-password -email -__v');
      if (user) {
        res.send(user);
      }
    }
  }
}