import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CountSlice {
  count: string[];
}

const initialState: CountSlice = {
  count: [],
};

const countSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setCountSlice(state, action: PayloadAction<string[]>) {
      state.count = action.payload;
    },
  },
});

export const { setCountSlice } = countSlice.actions;
export default countSlice.reducer;
