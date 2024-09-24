import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DataState {
  entries: Array<{
    name: string | null;
    age: number | null;
    email: string | null;
    password: string | null;
    rePassword: string | null;
    gender: string | null;
    country: string | null;
    file: string | null;
    accept: boolean;
    typeForm: string;
  }>;
}

const initialState: DataState = {
  entries: [],
};

const dataSlice = createSlice({
  name: 'dataSlice',
  initialState,
  reducers: {
    setData: (
      state,
      action: PayloadAction<{
        name: string | null;
        age: number | null;
        email: string | null;
        password: string | null;
        rePassword: string | null;
        gender: string | null;
        country: string | null;
        file: string | null;
        accept: boolean;
        typeForm: string;
      }>,
    ) => {
      state.entries.push(action.payload);
    },
  },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;
