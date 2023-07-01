import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCurrentUser = createAsyncThunk('currentUser/getCurrentUser', async () => {
  const res = await axios.get('/_api/current_user', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
  });
  return res.data;
});