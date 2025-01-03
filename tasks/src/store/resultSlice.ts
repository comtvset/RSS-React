import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from 'src/pages/mainPage/MainPage';

export interface ResultSlice {
  result: Person[];
}

const initialState: ResultSlice = {
  result: [],
};

const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    setResultSlice(state, action: PayloadAction<Person[]>) {
      state.result = action.payload;
    },
  },
});

export const { setResultSlice } = resultSlice.actions;
export default resultSlice.reducer;
