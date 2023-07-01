import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import mongoose from 'mongoose';
import cors from 'cors';
import { Router } from './router/Router';
import { keys } from './services/keys';

import './controllers/RootController';
import './controllers/AuthController';
import './controllers/UserController';
import './controllers/RequestsController';

import './models/User';
import './models/FriendRequests';
import './models/Chat';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  keys: ['123safa'],
}));
app.use(Router.getInstance());

mongoose
  .connect(keys.mongoDB)
  .then(() => console.log('CONNECTED TO MONGODB'))
  .catch((error) => console.log(error));


const PORT = 5000;
app.listen(PORT, (): void => console.log('Server is running on port', PORT));