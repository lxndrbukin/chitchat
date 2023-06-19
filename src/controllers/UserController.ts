import { Request, Response } from 'express';
import { controller, get } from './decorators';
import User from '../models/User';

@controller('/profile')
class UserController {
  @get('/')
  async getCurrentUser(req: Request, res: Response) {
    if (req.session && req.session.id) {
      const currentUser = await User.findOne({ _id: req.session.id });
      if (currentUser) {
        res.send(currentUser.email);
      }
    } else {
      res.redirect('/');
    }
  }
}