import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FriendRequestsState, FriendRequests, FriendRequestsPayload } from './types';
import { getFriendRequests } from '../thunks/getFriendRequests';
import { changeFriendRequestStatus } from '../thunks/changeFriendRequestStatus';

const initialState: FriendRequestsState = {
  loading: false,
  requests: {
    sent: [],
    received: []
  }
};

export const friendReqSlice = createSlice({
  name: 'friendRequests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFriendRequests.fulfilled, (state: FriendRequestsState, action: PayloadAction<FriendRequests>): void => {
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
    builder.addCase(changeFriendRequestStatus.fulfilled, (state: FriendRequestsState, action: PayloadAction<FriendRequestsPayload>) => {
      state.loading = false;
      if (action.payload.requestAction === 'Accept' || action.payload.requestAction === 'Decline') {
        state.requests = {
          ...state.requests,
          received: state.requests.received.filter(request => request.userId !== action.payload.userId)
        };
      } else if (action.payload.requestAction === 'Send') {
        state.requests = {
          ...state.requests,
          sent: [...state.requests.sent, { userId: action.payload.userId, fullName: { firstName: action.payload.firstName, lastName: action.payload.lastName } }]
        };
      } else if (action.payload.requestAction === 'Cancel') {
        state.requests = {
          ...state.requests,
          sent: state.requests.sent.filter(request => request.userId !== action.payload.userId)
        };
      }
    });
    builder.addCase(changeFriendRequestStatus.pending, (state: FriendRequestsState) => {
      state.loading = true;
    });
  }
});

export default friendReqSlice.reducer;