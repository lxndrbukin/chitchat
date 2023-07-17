import { Request, Response } from 'express';
import { controller, get, post, bodyValidator, use } from './decorators';
import { checkUser } from './middlewares';
import { createPassword } from './helpers';
import User from '../models/User';
import { Operations } from './middlewares';

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
  async postLogin(req: Request, res: Response) { }

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
    const { email, password, firstName, lastName } = req.body;
    const user = await User.create({
      fullName: {
        firstName,
        lastName
      },
      email,
      password: await createPassword(password),
      role: 'User'
    });
    req.session = { id: user.id, fullName: { firstName: user.fullName.firstName, lastName: user.fullName.lastName }, role: user.role };
    res.send(user);
  };

  @get('/logout')
  getLogout(req: Request, res: Response) {
    console.log('hi');
    req.session = undefined;
    res.send(req.session);
  }
}