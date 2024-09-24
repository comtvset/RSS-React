import { configureStore } from '@reduxjs/toolkit';
import dataSliceReducer from './dataSlice';
import countriesReducer from './countriesSlice';

export const store = configureStore({
  reducer: {
    form: dataSliceReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
