import { Request, Response, NextFunction } from 'express';
import { ErrorMessages } from './types';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.id) {
    next();
    return;
  }
  return res.send({ error: ErrorMessages.AccessDenied });
}