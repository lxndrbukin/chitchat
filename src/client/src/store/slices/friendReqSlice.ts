import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FriendRequestsState, FriendRequestProps, FriendRequestsPayload } from './types';
import { getFriendRequests } from '../thunks/getFriendRequests';

const initialState: FriendRequestsState = {
  loading: false,
  requests: {
    sent: [],
    received: []
  },
  error: ''
};

export const friendReqSlice = createSlice({
  name: 'friendRequests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFriendRequests.fulfilled, (state: FriendRequestsState, action: PayloadAction<FriendRequestsPayload>): void => {
      state.loading = false;
      state.requests = {
        ...state.requests,
        received: action.payload.received,
        sent: action.payload.sent,
      };
    });
    builder.addCase(getFriendRequests.pending, (state: FriendRequestsState): void => {
      state.loading = true;
    });
  }
});

export default friendReqSlice.reducer;