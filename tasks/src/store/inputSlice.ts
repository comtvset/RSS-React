import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InputSlice {
  input: string;
}

const initialState: InputSlice = {
  input: '',
};

const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    setInputSlice(state, action: PayloadAction<string>) {
      state.input = action.payload;
    },
  },
});

export const { setInputSlice } = inputSlice.actions;
export default inputSlice.reducer;
