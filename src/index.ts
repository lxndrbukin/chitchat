import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { Router } from './router/Router';
import './controllers/LoginController';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  keys: ['123safa'],
}));
app.use(Router.getInstance());


const PORT = 5000;
app.listen(PORT, (): void => console.log('Server is running on port', PORT));