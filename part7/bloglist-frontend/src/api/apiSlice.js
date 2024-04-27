import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import createBlogEndpoints from './blogs/endpoints';
import createUserEndpoints from './users/endpoints';

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
    ...createBlogEndpoints(builder),
    ...createUserEndpoints(builder),
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: '/login',
        method: 'POST',
        body: { username, password },
      }),
    }),
  }),
});

export const {
  useGetBasicBlogsQuery,
  useGetBlogsQuery,
  useGetBlogQuery,
  useGetBlogCommentsQuery,
  useCreateBlogCommentMutation,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useLoginMutation,
} = apiSlice;
