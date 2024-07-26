import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const starWarsAPI = createApi({
  reducerPath: 'starWarsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (build) => ({
    getQuery: build.query({
      query: ({ userQuery, page }) => `people/?search=${userQuery}&page=${page}`,
    }),
  }),
});

export const { useGetQueryQuery, useLazyGetQueryQuery } = starWarsAPI;

// export const { useGetQueryQuery, useGetPageQuery } = starWarsAPI;

// getPeopleOnPage: builder.query({
//   query: ({ inputValue, page }: { inputValue: string; page: number }) =>
//     `?search=${inputValue}&page=${page}`,
// }),

// export const starWarsAPI = createApi({
//   reducerPath: 'starWarsAPI',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/people/' }),
//   endpoints: (build) => ({
//     getQuery: build.query({
//       query: (query) => `?search=${query}`,
//     }),
//     getPage: build.query({
//       query: ({ query = '', page = '1' }) => `?search=${query}&page=${page}`,
//     }),
//   }),
// });
