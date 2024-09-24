import { createSlice } from '@reduxjs/toolkit';
import { COUNTRY } from 'src/serveces/countries/countries';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: COUNTRY,
  reducers: {},
});

export const selectCountries = (state: { countries: string[] }) => state.countries;

export default countriesSlice.reducer;
