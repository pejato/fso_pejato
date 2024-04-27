import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGetBasicBlogsQuery } from '../../api/apiSlice';
import Togglable from '../Togglable';
import CreateBlogForm from './CreateBlogForm';

function BlogList() {
  const {
    data: blogs,
    isSuccess,
    isError,
    error,
    isLoading,
  } = useGetBasicBlogsQuery();

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
          <Link to={`/blogs/${blog.id}`} key={blog.id}>
            <div>
              {blog.title} by {blog.author}
            </div>
          </Link>
        ))}
    </div>
  );
}
export default BlogList;
