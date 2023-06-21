import { NextFunction, Request, Response } from 'express';
import { UserRoles } from '../types/types';
import User from '../../models/User';
import { ErrorMessages } from './types';

export function checkAccess(roles: UserRoles[]) {
  return async function (req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.id) {
      const user = await User.findOne({ id: req.session.id });
      for (let role of roles) {
        if (user && user.role === role) {
          next();
          return;
        }
      }
    }
    res.status(403).send({ message: ErrorMessages.AccessDenied });
  };
}