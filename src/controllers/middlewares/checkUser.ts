import { NextFunction, Request, Response } from 'express';
import { comparePasswords, checkPassword } from '../helpers';
import User from '../../models/User';
import { ErrorMessages, Operations } from './types';



export function checkUser(operation: Operations) {
  return async function (req: Request, res: Response, next: NextFunction) {
    if (req.body.email) {
      const user = await User.findOne({
        email: req.body.email
      });
      if (operation === Operations.Signup) {
        if (user) {
          res.status(403).json({ message: ErrorMessages.EmailInUse });
          console.log('exists');
          return;
        } else if (!user && !await checkPassword(req.body.password)) {
          res.status(403).json({ message: ErrorMessages.PasswordLength });
          console.log('password');
          return;
        }
        next();
        return;
      } else if (operation === Operations.Login) {
        if (!user) {
          res.status(403).json({ message: ErrorMessages.UserNotFound });
          return;
        } else if (user && !await comparePasswords(user.password, req.body.password)) {
          res.status(403).json({ message: ErrorMessages.IncorrectPassword });
          return;
        }
        req.session = { id: user.id, fullName: { firstName: user.fullName.firstName, lastName: user.fullName.lastName }, role: user.role };
      }
      return res.send({
        _id: user?.id,
        fullName: user?.fullName,
        role: user?.role
      });
    }
  };
}