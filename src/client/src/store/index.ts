import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import { reducer as formReducer } from 'redux-form';

export const store = configureStore({
  reducer: {
    currentUser: userReducer,
    form: formReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export * from './thunks/getCurrentUser';
export * from './thunks/loginUser';