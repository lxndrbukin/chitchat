import { Request, Response } from 'express';
import { controller, get, post, bodyValidator, use } from './decorators';
import { existingUser } from './middlewares';
import User from '../models/User';


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
  async postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      req.session = { id: user.id };
      res.redirect('/profile/details');
      return;
    }
    res.send('User not found');
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
  @use(existingUser)
  async postSignup(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await User.create({
      email,
      password
    });
    req.session = { id: user.id };
    res.redirect('/secret');
  };

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = null;
    res.redirect('/');
  }
}