import { Request, Response, NextFunction } from 'express';
import { controller, get, use } from './decorators';
import { requireAuth, checkAccess } from './middlewares';
import { UserRoles } from './types/types';

@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    res.send('Hi there');
  }
}