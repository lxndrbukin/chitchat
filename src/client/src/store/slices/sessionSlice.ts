import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, SessionProps } from './types';
import { getCurrentUser } from '../thunks/getCurrentUser';
import { loginUser } from '../thunks/loginUser';
import { logoutUser } from '../thunks/logoutUser';
import { signupUser } from '../thunks/signupUser';
import { getFriendRequests } from '../thunks/getFriendRequests';

const initialState: UserState = {
  loading: false,
  loggedIn: false,
  userData: undefined,
  error: '',
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: (builder): void => {
    builder.addCase(getCurrentUser.fulfilled, (state: UserState, action: PayloadAction<SessionProps>): void => {
      state.loading = false;
      if (action.payload.error) {
        state.error = action.payload.error;
        return;
      }
      state.loggedIn = true;
      state.userData = action.payload;
    });
    builder.addCase(getCurrentUser.pending, (state: UserState): void => {
      state.loading = true;
    });
    builder.addCase(getCurrentUser.rejected, (state: UserState) => {
      state.loading = false;
      state.loggedIn = false;
    });
    builder.addCase(loginUser.fulfilled, (state: UserState, action: PayloadAction<SessionProps>): void => {
      state.loggedIn = true;
      if (state.loggedIn) {
        state.userData = action.payload;
        return;
      }
    });
    builder.addCase(logoutUser.fulfilled, (state: UserState): void => {
      state.loggedIn = false;
      state.userData = undefined;
    });
    builder.addCase(signupUser.fulfilled, (state: UserState, action: PayloadAction<SessionProps>): void => {
      state.loading = false;
      state.loggedIn = true;
      if (state.loggedIn) {
        state.userData = action.payload;
        return;
      }
    });
    builder.addCase(getFriendRequests.fulfilled, (state: UserState, action) => {

    });
  }
});

export default sessionSlice.reducer;