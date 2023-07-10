import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthFormValues } from './types';

export const signupUser = createAsyncThunk('currentUser/signupUser', async ({ firstName, lastName, email, password }: AuthFormValues) => {
  const res = await axios.post('/auth/signup', {
    firstName,
    lastName,
    email,
    password
  });
  return res.data;
});