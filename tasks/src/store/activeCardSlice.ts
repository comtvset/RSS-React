import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from 'src/pages/mainPage/MainPage';

export interface ActiveCard {
  activeCard: Person | null;
}

const initialState: ActiveCard = {
  activeCard: null,
};

const activeCard = createSlice({
  name: 'activeCard',
  initialState,
  reducers: {
    setActiveCard(state, action: PayloadAction<Person | null>) {
      state.activeCard = action.payload;
    },
  },
});

export const { setActiveCard } = activeCard.actions;
export default activeCard.reducer;
