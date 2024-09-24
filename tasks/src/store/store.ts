import { configureStore } from '@reduxjs/toolkit';
import inputReducer from 'src/store/inputSlice';
import resultReducer from 'src/store/resultSlice';
import loadingReducer from 'src/store/loadingSlice';
import countReducer from 'src/store/countSlice';
import activeCardReducer from 'src/store/activeCardSlice';
import checkedCardSliceReducer from 'src/store/checkedCardSlice';

import { starWarsAPI } from 'src/serveces/API/starWarsAPI';

export const store = configureStore({
  reducer: {
    [starWarsAPI.reducerPath]: starWarsAPI.reducer,
    input: inputReducer,
    result: resultReducer,
    loading: loadingReducer,
    count: countReducer,
    activeCard: activeCardReducer,
    checkedCard: checkedCardSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(starWarsAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
