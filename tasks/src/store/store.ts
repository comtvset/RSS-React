import { configureStore } from '@reduxjs/toolkit';
import dataSliceReducer from './dataSlice';

export const store = configureStore({
  reducer: {
    form: dataSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
