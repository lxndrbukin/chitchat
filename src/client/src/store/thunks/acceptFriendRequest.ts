import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const acceptFriendRequest = createAsyncThunk('friendRequests/acceptFriendRequest', async (userId: string) => {
  const res = await axios.post('/_api/friend_requests', {
    userId
  });
  return res.data;
});