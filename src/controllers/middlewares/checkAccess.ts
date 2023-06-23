import { NextFunction, Request, Response } from 'express';
import { UserRoles } from '../types';
import { ErrorMessages } from './types';

export function checkAccess(roles: UserRoles[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.session) {
      for (let role of roles) {
        if (req.session.role === role) {
          next();
          return;
        }
      }
    }
    res.status(403).send({ message: ErrorMessages.AccessDenied });
  };
}