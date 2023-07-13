import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUser = createAsyncThunk('user/getUser', async (_id: string) => {
  const res = await axios.get(`/_api/users/${_id}`);
  return res.data;
});