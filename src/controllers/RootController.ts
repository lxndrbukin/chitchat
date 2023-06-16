import { Request, Response, NextFunction } from 'express';
import { controller, get, use } from './decorators';

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }
  res.status(403);
  res.send('Not permitted');
}

@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    res.send('Hi there');
  }

  @get('/secret')
  @use(requireAuth)
  getSecret(req: Request, res: Response) {
    res.send('Welcome to the secret page');
  }
}