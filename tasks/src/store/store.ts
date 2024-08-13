import { configureStore } from '@reduxjs/toolkit';
import resultReducer from 'src/store/resultSlice';

export const store = configureStore({
  reducer: {
    result: resultReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
