import { Request, Response, NextFunction } from 'express';
import { ErrorMessages } from './types';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session) {
    next();
    return;
  }
  console.log('nope');
  res.send({ message: ErrorMessages.AccessDenied });
  return;
}