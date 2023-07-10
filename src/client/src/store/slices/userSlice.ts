import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getCurrentUser } from '../thunks/getCurrentUser';
import { loginUser } from '../thunks/loginUser';
import { logoutUser } from '../thunks/logoutUser';
import { signupUser } from '../thunks/signupUser';

export interface UserData {
  _id: string,
  email: string,
  role: string;
}

export interface ErrorMessage {
  message: string;
}

export interface UserState {
  loading: boolean;
  loggedIn: boolean;
  userData: UserData | {};
  error: string | undefined;
}

const initialState: UserState = {
  loading: false,
  loggedIn: false,
  userData: {},
  error: undefined
};

export const userSlice = createSlice({
  name: 'user',
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

export default userSlice.reducer;