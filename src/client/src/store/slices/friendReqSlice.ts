import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FriendRequestsState, FriendRequestProps, FriendRequestsPayload } from './types';
import { getFriendRequests } from '../thunks/getFriendRequests';
import { acceptFriendRequest } from '../thunks/acceptFriendRequest';
import { declineFriendRequest } from '../thunks/declineFriendRequest';
import { sendFriendRequest } from '../thunks/sendFriendRequest';
import { changeFriendRequestStatus } from '../thunks/changeFriendRequestStatus';

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
    builder.addCase(acceptFriendRequest.fulfilled, (state: FriendRequestsState, action: PayloadAction<string>) => {
      state.loading = false;
      state.requests = {
        ...state.requests,
        received: state.requests.received.filter(request => request.userId !== action.payload)
      };
    });
    builder.addCase(acceptFriendRequest.pending, (state: FriendRequestsState) => {
      state.loading = true;
    });
    builder.addCase(declineFriendRequest.fulfilled, (state: FriendRequestsState, action: PayloadAction<string>) => {
      state.requests = {
        ...state.requests,
        received: state.requests.received.filter(request => request.userId !== action.payload)
      };
    });
    builder.addCase(sendFriendRequest.fulfilled, (state, action) => {
      state.requests = {
        ...state.requests,

      };
    });
  }
});

export default friendReqSlice.reducer;