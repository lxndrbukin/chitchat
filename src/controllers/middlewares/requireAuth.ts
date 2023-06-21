import { Request, Response, NextFunction } from 'express';
import { ErrorMessages } from './types';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.id) {
    next();
    return;
  }
  res.status(403);
  res.send({ message: ErrorMessages.AccessDenied });
}