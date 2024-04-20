import React from 'react';
import Blog from './Blog';

function BlogList({ blogs }) {
  return (
    <div>
      <h2>Created Blogs</h2>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} initialBlog={blog} />
        ))}
    </div>
  );
}
export default BlogList;
