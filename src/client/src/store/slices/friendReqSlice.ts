import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FriendRequestsState, FriendRequestProps, FriendRequests, FriendRequestsPayload } from './types';
import { getFriendRequests } from '../thunks/getFriendRequests';
import { acceptFriendRequest } from '../thunks/acceptFriendRequest';
import { declineFriendRequest } from '../thunks/declineFriendRequest';
import { sendFriendRequest } from '../thunks/sendFriendRequest';
import { changeFriendRequestStatus } from '../thunks/changeFriendRequestStatus';
import { RequestAction } from '../thunks/types';

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
    builder.addCase(sendFriendRequest.fulfilled, (state, action) => {
      state.requests = {
        ...state.requests,

      };
    });
    builder.addCase(changeFriendRequestStatus.fulfilled, (state: FriendRequestsState, action: PayloadAction<FriendRequestsPayload>) => {
      state.loading = false;
      if (action.payload.requestAction === RequestAction.Accept || action.payload.requestAction === RequestAction.Decline) {
        state.requests = {
          ...state.requests,
          received: state.requests.received.filter(request => request.userId !== action.payload.userId)
        }
      } else if (action.payload.requestAction === RequestAction.Send) {
        state.requests = {
          ...state.requests,
          sent: [...state.requests.sent, {userId: action.payload.userId, fullName: {firstName: action.payload.firstName, lastName: action.payload.lastName}}]
        }
      }
    })
  }
});

export default friendReqSlice.reducer;