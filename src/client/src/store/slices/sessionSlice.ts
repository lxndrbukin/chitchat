import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './types';
import { getCurrentUser } from '../thunks/getCurrentUser';
import { loginUser } from '../thunks/loginUser';
import { logoutUser } from '../thunks/logoutUser';
import { signupUser } from '../thunks/signupUser';

const initialState: UserState = {
  loading: false,
  loggedIn: false,
  userData: {},
  error: undefined
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: (builder): void => {
    builder.addCase(getCurrentUser.fulfilled, (state: UserState, action: PayloadAction<UserState>): void => {
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
    builder.addCase(loginUser.fulfilled, (state: UserState, action: PayloadAction<UserState>): void => {
      state.loggedIn = true;
      state.userData = action.payload;
    });
    builder.addCase(logoutUser.fulfilled, (state: UserState, action: PayloadAction<object>): void => {
      state.loggedIn = false;
      state.userData = action.payload;
    });
    builder.addCase(signupUser.fulfilled, (state: UserState, action: PayloadAction<UserState>): void => {
      state.loading = false;
      if (action.payload.error) {
        state.error = action.payload.error;
        return;
      }
      state.loggedIn = true;
      state.userData = action.payload;
    });
  }
});

export default sessionSlice.reducer;