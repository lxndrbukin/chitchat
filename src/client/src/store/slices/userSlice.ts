import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  userId: string;
  fullName: {
    firstName: string;
    lastName: string;
  },
}

const initialState: UserState | null = null;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
});

export default userSlice.reducer;