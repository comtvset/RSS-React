import { Person } from '@/pages/main';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CheckedCardSlice {
  checkedCard: Person[];
}

const initialState: CheckedCardSlice = {
  checkedCard: [],
};

const checkedCardSlice = createSlice({
  name: 'checkedCard',
  initialState,
  reducers: {
    addCheckedCard(state, action: PayloadAction<Person>) {
      state.checkedCard.push(action.payload);
    },
    removeCheckedCard(state, action: PayloadAction<Person>) {
      state.checkedCard = state.checkedCard.filter((person) => person.name !== action.payload.name);
    },
    setCheckedCardSlice(state, action: PayloadAction<Person[]>) {
      state.checkedCard = action.payload;
    },
    clearCheckedCard(state) {
      state.checkedCard = [];
    },
  },
});

export const { addCheckedCard, removeCheckedCard, setCheckedCardSlice, clearCheckedCard } =
  checkedCardSlice.actions;
export default checkedCardSlice.reducer;
