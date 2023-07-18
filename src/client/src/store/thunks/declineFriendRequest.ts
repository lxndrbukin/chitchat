import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const declientFriendRequest = createAsyncThunk('friendRequests/declineFriendRequest', async (userId: string) => {
  const res = await axios.post('/_api/friend_requests', {
    userId
  });
  return res.data;
});