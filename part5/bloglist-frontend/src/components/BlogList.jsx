import React from 'react';
import Blog from './Blog';

function BlogList({ currentUser, blogs, onDeleted }) {
  return (
    <div>
      <h2>Created Blogs</h2>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            currentUser={currentUser}
            initialBlog={blog}
            onDeleted={onDeleted}
          />
        ))}
    </div>
  );
}
export default BlogList;
