import { createAsyncThunk } from '@reduxjs/toolkit';
import { FriendProps } from './types';
import axios from 'axios';

export const changeFriendStatus = createAsyncThunk('friendsList/addFriend', async ({ userId, firstName, lastName, requestAction }: FriendProps) => {
  const res = await axios.post('/_api/friends_list', {
    userId,
    firstName,
    lastName,
    requestAction
  });
  return res.data;
});