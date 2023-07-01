import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface LoginDetails {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk('currentUser/loginUser', async ({ email, password }: LoginDetails) => {
  await axios.post('/auth/login', {
    email,
    password
  });
});