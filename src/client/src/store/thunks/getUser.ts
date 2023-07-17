import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUser = createAsyncThunk('user/getUser', async (userId: string) => {
  const res = await axios.get(`/_api/users/${userId}`);
  return res.data;
});