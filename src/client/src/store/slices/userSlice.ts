import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getCurrentUser } from '../thunks/getCurrentUser';
import { loginUser } from '../thunks/loginUser';

export interface UserData {
  _id: string,
  email: string,
  role: string;
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
      state.loggedIn = true;
      state.userData = action.payload;
    });
    builder.addCase(loginUser.fulfilled, (state: UserState, action: PayloadAction<UserState>): void => {
      state.loggedIn = true;
      state.userData = action.payload;
    });
  }
});

export default userSlice.reducer;