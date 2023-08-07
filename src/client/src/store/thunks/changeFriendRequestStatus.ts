import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FriendRequest, RequestAction } from './types';

export const changeFriendRequestStatus = createAsyncThunk('session/changeFriendRequestStatus', async ({ userId, firstName, lastName, requestAction }: FriendRequest) => {
  const res = await axios.post('/_api/friend_requests', {
    userId,
    firstName,
    lastName,
    requestAction
  });
  return res.data;
});