import { createAsyncThunk } from '@reduxjs/toolkit';
import { FriendProps } from './types';
import axios from 'axios';

export const addFriend = createAsyncThunk('friendsList/addFriend', async ({ userId, firstName, lastName }: FriendProps) => {
  const res = await axios.post('/_api/friends_list', {
    userId,
    firstName,
    lastName
  });
  return res.data;
});