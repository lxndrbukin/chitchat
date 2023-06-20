import { NextFunction, Request, Response } from 'express';
import { comparePasswords, checkPassword } from '../helpers';
import User from '../../models/User';

export enum Operations {
  login = 'login',
  signup = 'signup'
}

export function checkUser(operation: Operations) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const user = await User.findOne({
      email: req.body.email
    });
    if (operation === Operations.signup) {
      if (user) {
        res.status(403).json({ message: 'Email already in use' });
        return;
      } else if (!user && !await checkPassword(req.body.password)) {
        res.status(403).json({ message: 'Password must be from 4 to 20 characters long' });
        return;
      }
    } else if (operation === Operations.login) {
      if (!user) {
        res.status(403).json({ message: 'User not found' });
        return;
      } else if (user && !await comparePasswords(user.password, req.body.password)) {
        res.status(403).json({ message: 'Incorrect password' });
        return;
      }
      req.session = { id: user.id };
    }
    next();
  };
}