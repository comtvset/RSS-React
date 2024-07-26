import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ResultSlice {
  result: [];
}

const initialState: ResultSlice = {
  result: [],
};

const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    setResultSlice(state, action: PayloadAction<[]>) {
      state.result = action.payload;
    },
  },
});

export const { setResultSlice } = resultSlice.actions;
export default resultSlice.reducer;
