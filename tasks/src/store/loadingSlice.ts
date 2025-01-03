import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoadingSlice {
  loading: boolean;
}

const initialState: LoadingSlice = {
  loading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoadingSlice(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setLoadingSlice } = loadingSlice.actions;
export default loadingSlice.reducer;
