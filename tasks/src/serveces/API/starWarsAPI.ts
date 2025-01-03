import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const starWarsAPI = createApi({
  reducerPath: 'starWarsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.py4e.com/api/' }),
  endpoints: (build) => ({
    getQuery: build.query({
      query: ({ userQuery, page }) => `people/?search=${userQuery}&page=${page}`,
    }),
  }),
});

export const { useGetQueryQuery, useLazyGetQueryQuery } = starWarsAPI;
