import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, UserProps } from './types';
import { getUser } from '../thunks/getUser';

const initialState: UserState = {
  loading: false,
  userData: undefined,
  error: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder): void => {
    builder.addCase(getUser.fulfilled, (state: UserState, action: PayloadAction<UserProps>) => {
      state.loading = false;
      if (!state.loading) {
        state.userData = action.payload;
        return;
      }
    });
    builder.addCase(getUser.pending, (state: UserState) => {
      state.loading = true;
    });
  },

});

export default userSlice.reducer;