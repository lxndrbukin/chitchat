import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FriendRequestProps, RequestAction } from './types';

export const changeFriendRequestStatus = createAsyncThunk('friendRequests/changeFriendRequestStatus', async ({ userId, firstName, lastName, requestAction }: FriendRequestProps) => {
  const res = await axios.post('/_api/friend_requests', {
    userId,
    firstName,
    lastName,
    requestAction
  });
  return res.data;
});