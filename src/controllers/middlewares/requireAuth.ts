import { Request, Response, NextFunction } from 'express';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.id) {
    next();
    return;
  }
  res.status(403).json('Not permitted');
}