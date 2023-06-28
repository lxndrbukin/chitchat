import { Request, Response } from 'express';
import { controller, use, get } from './decorators';
import { requireAuth } from './middlewares';
import User, { IUser } from '../models/User';

@controller('/_api')
class UserController {
  @get('/current_user')
  @use(requireAuth)
  async getCurrentUser(req: Request, res: Response) {
    if (req.session && req.session.id) {
      const currentUser = await User.findOne({ _id: req.session.id }).select('-password -__v');
      if (currentUser) {
        res.send(currentUser);
      }
    }
  }

  @get('/users')
  @use(requireAuth)
  async getAllUsers(req: Request, res: Response) {
    const users: IUser[] = await User.find().select('-password -__v');
    res.send(users);
  }
}