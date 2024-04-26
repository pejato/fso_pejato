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
    getBasicBlogs: builder.query({
      query: () => '/blogs/basic_view',
      providesTags: ['BasicBlogs'],
    }),
    getBlogs: builder.query({
      query: () => '/blogs',
      providesTags: ['Blogs'],
    }),
    getBlog: builder.query({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Blog', id }],
    }),
    createBlog: builder.mutation({
      query: (newBlog) => ({
        url: '/blogs',
        method: 'POST',
        body: newBlog,
      }),
      invalidatesTags: ['BasicBlogs', 'Blogs'],
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...patchSet }) => ({
        url: `/blogs/${id}/`,
        method: 'PATCH',
        body: patchSet,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'BasicBlogs' },
        { type: 'Blogs' },
        { type: 'Blog', id },
      ],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'BasicBlogs' },
        { type: 'Blogs' },
        { type: 'Blog', id },
      ],
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

export const {
  useGetBasicBlogsQuery,
  useGetBlogsQuery,
  useGetBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useLoginMutation,
} = apiSlice;
