const getBasicBlogs = (builder) =>
  builder.query({
    query: () => '/blogs/basic_view',
    providesTags: ['BasicBlogs'],
  });
const getBlogs = (builder) =>
  builder.query({
    query: () => '/blogs',
    providesTags: ['Blogs'],
  });
const getBlog = (builder) =>
  builder.query({
    query: (id) => ({
      url: `/blogs/${id}`,
      method: 'GET',
    }),
    providesTags: (result, error, id) => [{ type: 'Blog', id }],
  });

const createBlog = (builder) =>
  builder.mutation({
    query: (newBlog) => ({
      url: '/blogs',
      method: 'POST',
      body: newBlog,
    }),
    invalidatesTags: ['BasicBlogs', 'Blogs'],
  });

const updateBlog = (builder) =>
  builder.mutation({
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
  });

const deleteBlog = (builder) =>
  builder.mutation({
    query: (id) => ({
      url: `/blogs/${id}`,
      method: 'DELETE',
    }),
    invalidatesTags: (result, error, id) => [
      { type: 'BasicBlogs' },
      { type: 'Blogs' },
      { type: 'Blog', id },
    ],
  });

function createEndpoints(builder) {
  const endpoints = {
    getBasicBlogs,
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
  };
  for (const [key, fn] of Object.entries(endpoints)) {
    endpoints[key] = fn(builder);
  }
  return endpoints;
}

export default createEndpoints;
