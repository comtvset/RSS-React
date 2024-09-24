import { expect, test } from 'vitest';
import inputReducer, { setInputSlice } from 'src/store/inputSlice';
import resultReducer, { setResultSlice } from 'src/store/resultSlice';
import loadingReducer, { setLoadingSlice } from 'src/store/loadingSlice';
import countReducer, { setCountSlice } from 'src/store/countSlice';
import activeCardReducer, { setActiveCard } from 'src/store/activeCardSlice';
import checkedCardSliceReducer, {
  addCheckedCard,
  clearCheckedCard,
  removeCheckedCard,
  setCheckedCardSlice,
} from 'src/store/checkedCardSlice';
import store, { RootState } from 'src/store/store';
import { PersonAllFields } from 'src/pages/mainPage/MainPage';

const samplePerson: PersonAllFields = {
  name: 'persone',
  height: 'tall',
  mass: '100',
  hair_color: 'blue',
  skin_color: 'blue',
  eye_color: 'blue',
  birth_year: '0',
  gender: 'enby',
  homeworld: 'https://test',
  films: ['film_1', 'film_2'],
  species: ['film_1', 'film_2'],
  vehicles: ['the_best'],
  starships: ['the_best'],
  created: 'tomorrow',
  edited: 'yesterday',
  url: 'https://test',
};

test('should have the correct initial state', () => {
  const initialState: RootState = store.getState();

  expect(initialState.input).toEqual(inputReducer(undefined, { type: '@@INIT' }));
  expect(initialState.result).toEqual(resultReducer(undefined, { type: '@@INIT' }));
  expect(initialState.loading).toEqual(loadingReducer(undefined, { type: '@@INIT' }));
  expect(initialState.count).toEqual(countReducer(undefined, { type: '@@INIT' }));
  expect(initialState.activeCard).toEqual(activeCardReducer(undefined, { type: '@@INIT' }));
  expect(initialState.checkedCard).toEqual(checkedCardSliceReducer(undefined, { type: '@@INIT' }));
});

describe('redux input', () => {
  it('should set the input correctly', () => {
    const initialState = { input: '' };
    const input = 'test';
    const action = setInputSlice(input);
    const result = inputReducer(initialState, action);
    expect(result).toEqual({ input });
  });
});

describe('redux result', () => {
  it('should set the result correctly', () => {
    const initialState = { result: [] };
    const newResult = [samplePerson];
    const action = setResultSlice(newResult);
    const state = resultReducer(initialState, action);
    expect(state).toEqual({ result: newResult });
  });
});

describe('redux loading', () => {
  it('should set the loading correctly', () => {
    const initialState = { loading: false };
    const loading = true;
    const action = setLoadingSlice(loading);
    const result = loadingReducer(initialState, action);
    expect(result).toEqual({ loading });
  });
});

describe('redux count', () => {
  it('should set the count correctly', () => {
    const initialState = { count: [] };
    const newCount = ['item1', 'item2'];
    const action = setCountSlice(newCount);
    const result = countReducer(initialState, action);
    expect(result).toEqual({ count: newCount });
  });
});

describe('redux checkedCard', () => {
  it('should add a checked card correctly', () => {
    const initialState = { checkedCard: [] };
    const action = addCheckedCard(samplePerson);
    const result = checkedCardSliceReducer(initialState, action);
    expect(result).toEqual({ checkedCard: [samplePerson] });
  });

  it('should remove a checked card correctly', () => {
    const initialState = { checkedCard: [samplePerson] };
    const action = removeCheckedCard(samplePerson);
    const result = checkedCardSliceReducer(initialState, action);
    expect(result).toEqual({ checkedCard: [] });
  });

  it('should set checked cards correctly', () => {
    const initialState = { checkedCard: [] };
    const newCheckedCards: PersonAllFields[] = [samplePerson];
    const action = setCheckedCardSlice(newCheckedCards);
    const result = checkedCardSliceReducer(initialState, action);
    expect(result).toEqual({ checkedCard: newCheckedCards });
  });

  it('should clear checked cards correctly', () => {
    const initialState = { checkedCard: [samplePerson] };
    const action = clearCheckedCard();
    const result = checkedCardSliceReducer(initialState, action);
    expect(result).toEqual({ checkedCard: [] });
  });
});

describe('redux activeCard', () => {
  it('should set the active card correctly', () => {
    const initialState = { activeCard: null };
    const action = setActiveCard(samplePerson);
    const result = activeCardReducer(initialState, action);
    expect(result).toEqual({ activeCard: samplePerson });
  });

  it('should clear the active card correctly', () => {
    const initialState = { activeCard: samplePerson };
    const action = setActiveCard(null);
    const result = activeCardReducer(initialState, action);
    expect(result).toEqual({ activeCard: null });
  });
});
