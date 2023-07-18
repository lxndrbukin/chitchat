import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  list: [],
  error: ''
};

export const friendsListSlice = createSlice({
  name: 'friendsList',
  initialState,
  reducers: {}
});