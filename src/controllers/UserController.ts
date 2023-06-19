import { Request, Response } from 'express';
import { controller, get, post, put, bodyValidator } from './decorators';
import User, { IUser } from '../models/User';
import FriendReqs, { IFriendReq } from '../models/FriendRequests';

interface Session {
  id: string;
}

function renderUsers(users: IUser[]): string[] {
  return users.map((user: IUser) => {
    return `
      <div>${user.email}</div>
      <form action='/profile/friend_requests' method='POST'>
        <input value='${user.id}' name='userId' />
        <button>Send Request</button>
      </form>
    `;
  });
}

function showUsers(users: IUser[]): string {
  return `
    <div>
      ${renderUsers(users).join('')}
    </div>
  `;
}

@controller('/profile')
class UserController {
  @get('/edit')
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
      res.redirect('/');
    }
  }

  @get('/users')
  async getAllUsers(req: Request, res: Response) {
    const users: IUser[] = await User.find().select('-password -__v');
    res.send(showUsers(users));
  }

  @get('/friend_requests')
  async getFriendRequests(req: Request, res: Response) {
    if (req.session) {
      const userReqs = await FriendReqs.find({ userId: req.session.id });
      res.send(userReqs);
      return;
    }
    res.send('No session');
  }

  @post('/friend_requests')
  async sendFriendRequest(req: Request, res: Response) {
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
    res.redirect('/profile/users');
  }
}