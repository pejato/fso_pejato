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
    <div className="m-4">
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <CreateBlogForm onCreatedBlog={onCreatedBlog} />
      </Togglable>
      <h2 className="font-bold">Created Blogs</h2>
      <ul className="list-disc">
        {blogs
          .toSorted((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id} className="ml-4">
              <Link
                to={`/blogs/${blog.id}`}
                className="font-medium text-blue-500 dark:text-blue-700 hover:underline"
              >
                {blog.title} by {blog.author}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
export default BlogList;
