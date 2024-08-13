import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Example {
  smt: string;
}

export interface ExampleSlice {
  result: Example[];
}

const initialState: ExampleSlice = {
  result: [],
};

const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    setResultSlice(state, action: PayloadAction<Example[]>) {
      state.result = action.payload;
    },
  },
});

export const { setResultSlice } = resultSlice.actions;
export default resultSlice.reducer;
