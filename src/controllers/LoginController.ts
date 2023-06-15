import { Request, Response } from 'express';
import { controller, get, post } from './decorators';
import User, { IUser } from '../models/User';

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
  async postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (email && password) {
      req.session = { loggedIn: true };
      const user: IUser = await User.create({
        email,
        password
      });
      console.log(user);
    } else {
      res.send('Invalid email or password');
    }
  };
}