import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const sendFriendRequest = createAsyncThunk('session/sendFriendRequest', async (userId: string) => {
  const res = await axios.post('/_api/friend_requests', {
    userId
  });
  return res.data;
});