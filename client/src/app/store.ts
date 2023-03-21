import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../feature/userSlice';
import todoReducer from '../feature/todoSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer,
  },
});
