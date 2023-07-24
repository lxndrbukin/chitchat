import { createSlice } from '@reduxjs/toolkit';
import { getFriendsList } from '../thunks/getFriendsList';

const initialState = {
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
    builder.addCase(getFriendsList.pending, (state, action) => {
      state.loading = true;
    });
  }
});

export default friendsListSlice.reducer;