import React, { useRef } from 'react';
import Blog from './Blog';
import { useGetBlogsQuery } from '../../api/apiSlice';
import Togglable from '../Togglable';
import CreateBlogForm from './CreateBlogForm';

function BlogList({ currentUser }) {
  const {
    data: blogs,
    isSuccess,
    isError,
    error,
    isLoading,
  } = useGetBlogsQuery();

  const blogFormRef = useRef();
  const onCreatedBlog = () => {
    blogFormRef.current.toggleVisibility();
  };

  if (isError) {
    return <div>{error.message}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isSuccess) {
    return <div>Something went wrong :&#40;</div>;
  }

  return (
    <div>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <CreateBlogForm onCreatedBlog={onCreatedBlog} />
      </Togglable>
      <h2>Created Blogs</h2>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} currentUser={currentUser} blog={blog} />
        ))}
    </div>
  );
}
export default BlogList;
