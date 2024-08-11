import { configureStore } from '@reduxjs/toolkit';
import inputReducer from '../store/inputSlice';
import resultReducer from '../store/resultSlice';
import loadingReducer from '../store/loadingSlice';
import countReducer from '../store/countSlice';
import activeCardReducer from '../store/activeCardSlice';
import checkedCardSliceReducer from '../store/checkedCardSlice';

export const store = configureStore({
  reducer: {
    input: inputReducer,
    result: resultReducer,
    loading: loadingReducer,
    count: countReducer,
    activeCard: activeCardReducer,
    checkedCard: checkedCardSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
