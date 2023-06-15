import { Request, Response } from 'express';
import { controller, get, post } from './decorators';

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(/*html*/ `
      <form method='POST'>
        <input name='email' type='text' />
        <input name='password' type='password' />
        <button>Submit</button>
      </form>
    `);
  }
  @post('/login')
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body;
    if (email && password) {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.send('Invalid email or password');
    }
  }
}