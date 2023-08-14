import { Request, Response } from 'express';
import { controller, use, get, post } from './decorators';
import { requireAuth } from './middlewares';
import UserChats from '../models/Chat';

@controller('/_api')
class ChatsController {
  @get('/chats/:userId')
  @use(requireAuth)
  async getUserChats(req: Request, res: Response) {
    if (req.session) {
      const currentUserChats = await UserChats.find({ members: {$all: [req.session.id]}});
      if (currentUserChats) {
        res.send(currentUserChats);
      }
    }
  }
}
