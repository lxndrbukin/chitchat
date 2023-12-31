import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getFriendRequests = createAsyncThunk('friendRequests/getFriendRequests', async (userId: string) => {
  const res = await axios.get(`/_api/friend_requests/${userId}`);
  return res.data;
});