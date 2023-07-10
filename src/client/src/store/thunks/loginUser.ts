import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthFormValues } from './types';

export const loginUser = createAsyncThunk('currentUser/loginUser', async ({ email, password }: AuthFormValues) => {
  const res = await axios.post('/auth/login', {
    email: email,
    password: password
  });
  return res.data;
});