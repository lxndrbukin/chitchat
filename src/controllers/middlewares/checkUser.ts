import { NextFunction, Request, Response } from 'express';
import { comparePasswords, checkPassword } from '../helpers';
import User from '../../models/User';
import { ErrorMessages, Operations } from './types';



export function checkUser(operation: Operations) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const user = await User.findOne({
      email: req.body.email
    });
    if (operation === Operations.Signup) {
      if (user) {
        res.status(403).json({ message: ErrorMessages.EmailInUse });
        return;
      } else if (!user && !await checkPassword(req.body.password)) {
        res.status(403).json({ message: ErrorMessages.PasswordLength });
        return;
      }
    } else if (operation === Operations.Login) {
      if (!user) {
        res.status(403).json({ message: ErrorMessages.UserNotFound });
        return;
      } else if (user && !await comparePasswords(user.password, req.body.password)) {
        res.status(403).json({ message: ErrorMessages.IncorrectPassword });
        return;
      }
      req.session = { id: user.id };
    }
    next();
  };
}