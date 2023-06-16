import { Request, Response } from 'express';
import { controller, get, post, put, bodyValidator } from './decorators';
import User from '../models/User';

interface Session {
  id: string;
}

@controller('/profile')
class UserController {
  @get('/details')
  async getCurrentUser(req: Request, res: Response) {
    if (req.session && req.session.id) {
      const currentUser = await User.findOne({ _id: req.session.id });
      if (currentUser) {
        res.send(/*html*/ `
          <div>
            <input type='text' value='${currentUser.email}' />
          </div>
        `);
      }
    } else {
      res.send('User not found');
    }
  }
}