import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const sendFriendRequest = createAsyncThunk('session/sendFriendRequest', async ({ userId, firstName, lastName }: { userId: string, firstName: string, lastName: string; }) => {
  const res = await axios.post('/_api/friend_requests', {
    userId,
    firstName,
    lastName
  });
  return res.data;
});