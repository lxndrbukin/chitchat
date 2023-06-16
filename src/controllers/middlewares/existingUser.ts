import { NextFunction, Request, Response } from 'express';
import User from '../../models/User';

export async function existingUser(req: Request, res: Response, next: NextFunction) {
  const user = await User.findOne({
    email: req.body.email
  });
  if (user) {
    res.status(403).send('Email already in use');
    return;
  }
  next();
}