import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, UserProps } from './types';
import { getUser } from '../thunks/getUser';

const initialState: UserState = {
  loading: false,
  userData: {},
  error: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder): void => {
    builder.addCase(getUser.fulfilled, (state: UserState, action: PayloadAction<UserProps>) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(getUser.pending, (state: UserState) => {
      state.loading = true;
    });
  },

});

export default userSlice.reducer;