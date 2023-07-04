import { Request, Response } from 'express';
import { controller, get, post, bodyValidator, use } from './decorators';
import { checkUser } from './middlewares';
import { createPassword } from './helpers';
import User from '../models/User';
import { Operations } from './middlewares';
import { UserRoles } from './types';

@controller('/auth')
class AuthController {
  @get('/login')
  getLogin(req: Request, res: Response) {
    res.send(/*html*/ `
      <form method='POST'>
        <input name='email' type='text' />
        <input name='password' type='password' />
        <button>Submit</button>
      </form>
    `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  @use(checkUser(Operations.Login))
  async postLogin(req: Request, res: Response) {
    res.redirect('/');
  }

  @get('/signup')
  getSignup(req: Request, res: Response) {
    res.send(/*html*/ `
      <form method='POST'>
        <input name='email' type='text' />
        <input name='password' type='password' />
        <button>Submit</button>
      </form>
    `);
  }

  @post('/signup')
  @bodyValidator('email', 'password')
  @use(checkUser(Operations.Signup))
  async postSignup(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await User.create({
      fullName: {
        firstName: req.body.firstName,
        lastName: req.body.lastName
      },
      email,
      password: await createPassword(password),
      role: UserRoles.User
    });
    req.session = { id: user.id, role: user.role };
    res.redirect('/secret');
  };

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = null;
    res.redirect('/');
  }
}