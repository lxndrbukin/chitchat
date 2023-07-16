import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCurrentUser = createAsyncThunk('session/getCurrentUser', async () => {
  const res = await axios.get('/_api/current_user');
  return res.data;
});