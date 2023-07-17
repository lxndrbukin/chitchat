import { createAsyncThunk } from '@reduxjs/toolkit';
import { FriendRequest } from './types';
import axios from 'axios';

export const sendFriendRequest = createAsyncThunk('session/sendFriendRequest', async ({ userId, firstName, lastName }: FriendRequest) => {
  const res = await axios.post('/_api/friend_requests', {
    userId,
    firstName,
    lastName
  });
  return res.data;
});