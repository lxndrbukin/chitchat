import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getFriendsList = createAsyncThunk('friendsList/getFriendsList', async (userId: string) => {
  const res = await axios.get(`/_api/friends_list/${userId}`);
  return res.data;
});