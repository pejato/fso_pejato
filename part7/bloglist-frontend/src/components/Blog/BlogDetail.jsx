import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { showNotification } from '../../reducers/notificationReducer';
import {
  useDeleteBlogMutation,
  useGetBlogQuery,
  useUpdateBlogMutation,
} from '../../api/apiSlice';
import BlogComments from './BlogComments';

function BlogDetail() {
  const dispatch = useDispatch();
  const [updateBlog, { isUpdateBlogLoading }] = useUpdateBlogMutation();
  const [deleteBlog, { isDeleteBlogLoading }] = useDeleteBlogMutation();

  const { id } = useParams();
  const user = useSelector((state) => state.auth);
  const { data: blog, isLoading: isBlogLoading } = useGetBlogQuery(id);

  if (isBlogLoading) {
    return null;
  }

  const likeBlog = async () => {
    try {
      await updateBlog({ id: blog.id, likes: blog.likes + 1 }).unwrap();
    } catch (error) {
      if (error?.data?.error) {
        dispatch(showNotification(error.data.error, true));
      } else {
        dispatch(showNotification(`Failed to like '${blog.title}'`, true));
      }
    }
  };

  const onDelete = async () => {
    try {
      if (window.confirm(`Are you sure you want to remove '${blog.title}'?`)) {
        await deleteBlog(blog.id).unwrap();
        dispatch(showNotification(`Removed '${blog.title}'`));
      }
    } catch (error) {
      if (error?.data?.error) {
        dispatch(showNotification(error.data.error, true));
      } else {
        dispatch(showNotification(`Removed '${blog.title}'`, true));
      }
    }
  };

  const deleteContent = user.id === blog.user.id && (
    <button
      type="button"
      disabled={isDeleteBlogLoading}
      onClick={() => onDelete(blog)}
    >
      Remove
    </button>
  );

  return (
    <div className="blog-detail m-4">
      <h2>
        <span>{blog.title}</span> by {blog.author}
      </h2>
      <div>
        <a href={`//${blog.url}`} target="_blank" rel="noreferrer noopener">
          {blog.url}
        </a>
      </div>
      <div className="space-x-1.5">
        <span>Likes {blog.likes}</span>
        <button
          className="blue-button"
          type="button"
          disabled={isUpdateBlogLoading}
          onClick={likeBlog}
        >
          like
        </button>
      </div>
      <div>Uploaded by {blog.user.name}</div>
      {deleteContent}
      <BlogComments blogId={blog.id} />
    </div>
  );
}

export default BlogDetail;
