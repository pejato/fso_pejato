import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: new URL('/api', window.location.origin).href,
  prepareHeaders: (headers, api) => {
    if (api.getState().auth?.token) {
      headers.set('Authorization', `Bearer ${api.getState().auth.token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => '/blogs',
      providesTags: ['Blogs'],
    }),
    createBlog: builder.mutation({
      query: (newBlog) => ({
        url: '/blogs',
        method: 'POST',
        body: newBlog,
      }),
      invalidatesTags: ['Blogs'],
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

export const { useGetBlogsQuery, useCreateBlogMutation, useLoginMutation } =
  apiSlice;
