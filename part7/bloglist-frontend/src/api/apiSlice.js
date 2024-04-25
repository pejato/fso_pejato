import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, api) => {
    if (api.auth?.token) {
      headers.set('authorization', api.auth.token);
    } else {
      console.log(api.getState());
    }

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => '/blogs',
    }),
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: '/login',
        method: 'POST',
        body: { username, password },
      }),
    }),
  }),
});

export const { useGetBlogsQuery, useLoginMutation } = apiSlice;
