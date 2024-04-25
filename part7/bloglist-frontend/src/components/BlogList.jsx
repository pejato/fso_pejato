import React from 'react';
import Blog from './Blog';
import { useGetBlogsQuery } from '../api/apiSlice';

function BlogList({ currentUser, onLike, onDeleted }) {
  const { data: blogs, isSuccess, isError, error } = useGetBlogsQuery();

  if (isError) {
    return <div>{error.message}</div>;
  }
  if (!isSuccess) {
    return <div>Something went wrong...</div>;
  }
  return (
    <div>
      <h2>Created Blogs</h2>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            currentUser={currentUser}
            blog={blog}
            onLike={onLike}
            onDeleted={onDeleted}
          />
        ))}
    </div>
  );
}
export default BlogList;
