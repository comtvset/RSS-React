import { RootState } from './store';

export const getQuery = (state: RootState) => state.input.input;
export const getResult = (state: RootState) => state.result.result;
export const getCheckedCard = (state: RootState) => state.checkedCard.checkedCard;
export const getActiveCard = (state: RootState) => state.activeCard.activeCard;
export const getCountPage = (state: RootState) => state.count.count;
export const getLoading = (state: RootState) => state.loading.loading;
