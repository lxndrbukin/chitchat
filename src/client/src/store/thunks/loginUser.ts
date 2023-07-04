import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface LoginDetails {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk('currentUser/loginUser', async ({ email, password }: LoginDetails) => {
  const res = await axios.post('/auth/login', {
    email: email,
    password: password
  });
  return res.data;
});