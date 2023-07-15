import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './slices/sessionSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    user: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './slices/types';
export * from './slices/sessionSlice';
export * from './slices/userSlice';
export * from './thunks/getCurrentUser';
export * from './thunks/getUser';
export * from './thunks/loginUser';
export * from './thunks/logoutUser';