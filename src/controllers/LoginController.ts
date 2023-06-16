import { Request, Response } from 'express';
import { controller, get, post, bodyValidator, use } from './decorators';
import { existingUser } from './middlewares';
import User from '../models/User';


@controller('/auth')
class LoginController {
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
  @use(existingUser)
  async postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    req.session = { loggedIn: true };
    await User.create({
      email,
      password
    });
    res.redirect('/secret');
  };
}