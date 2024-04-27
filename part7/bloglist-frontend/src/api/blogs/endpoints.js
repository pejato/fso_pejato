import createEndpointsGenerator from '../endpointHelpers';

const getBasicBlogs = (builder) =>
  builder.query({
    query: () => '/blogs/basic_view',
    providesTags: (result) =>
      result
        ? [
            ...result.map(({ id }) => ({ type: 'BasicBlogs', id })),
            { type: 'BasicBlogs', id: 'LIST' },
          ]
        : [{ type: 'BasicBlogs', id: 'LIST' }],
  });
const getBlogs = (builder) =>
  builder.query({
    query: () => '/blogs',
    providesTags: (result) =>
      result
        ? [
            ...result.map(({ id }) => ({ type: 'Blogs', id })),
            { type: 'Blogs', id: 'LIST' },
          ]
        : [{ type: 'Blogs', id: 'LIST' }],
  });
const getBlog = (builder) =>
  builder.query({
    query: (id) => ({
      url: `/blogs/${id}`,
      method: 'GET',
    }),
    providesTags: (result, error, id) => [{ type: 'Blogs', id }],
  });

const createBlog = (builder) =>
  builder.mutation({
    query: (newBlog) => ({
      url: '/blogs',
      method: 'POST',
      body: newBlog,
    }),
    invalidatesTags: [
      { type: 'BasicBlogs', id: 'LIST' },
      { type: 'Blogs', id: 'LIST' },
    ],
  });

const updateBlog = (builder) =>
  builder.mutation({
    query: ({ id, ...patchSet }) => ({
      url: `/blogs/${id}/`,
      method: 'PATCH',
      body: patchSet,
    }),
    invalidatesTags: (result, error, { id }) => [
      { type: 'BasicBlogs', id: 'LIST' },
      { type: 'Blogs', id: 'LIST' },
      { type: 'Blogs', id },
    ],
  });

const deleteBlog = (builder) =>
  builder.mutation({
    query: (id) => ({
      url: `/blogs/${id}`,
      method: 'DELETE',
    }),
    invalidatesTags: (result, error, id) => [
      { type: 'BasicBlogs', id: 'LIST' },
      { type: 'Blogs', id: 'LIST' },
      { type: 'Blogs', id },
    ],
  });

const getBlogComments = (builder) =>
  builder.query({
    query: (blogId) => `/blogs/${blogId}/comments`,
    providesTags: (result, error, blogId) => [
      { type: 'BlogComments', id: blogId },
    ],
  });

const createBlogComment = (builder) =>
  builder.mutation({
    query: ({ blogId, comment }) => ({
      url: `/blogs/${blogId}/comments`,
      method: 'POST',
      body: { text: comment },
    }),
    invalidatesTags: (result, error, { blogId }) => [
      { type: 'BlogComments', id: blogId },
    ],
  });

export default createEndpointsGenerator({
  getBasicBlogs,
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogComments,
  createBlogComment,
});
