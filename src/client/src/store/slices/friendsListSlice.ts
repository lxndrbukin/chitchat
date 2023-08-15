import { createSlice } from '@reduxjs/toolkit';
import { getFriendsList } from '../thunks/getFriendsList';
import { changeFriendStatus } from '../thunks/changeFriendStatus';
import { FriendsListState } from './types';

const initialState: FriendsListState = {
  loading: false,
  list: [],
  error: ''
};

export const friendsListSlice = createSlice({
  name: 'friendsList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFriendsList.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });
    builder.addCase(getFriendsList.pending, (state) => {
      state.loading = true;
    });

  }
});

export default friendsListSlice.reducer;