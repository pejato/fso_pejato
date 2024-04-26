import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../reducers/notificationReducer';
import {
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} from '../../api/apiSlice';

function Blog({ currentUser, blog }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const buttonText = isExpanded ? 'Hide' : 'View';
  const dispatch = useDispatch();
  const [updateBlog, { isUpdateBlogLoading }] = useUpdateBlogMutation();
  const [deleteBlog, { isDeleteBlogLoading }] = useDeleteBlogMutation();

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

  const deleteContent = currentUser.id === blog.user.id && (
    <button
      type="button"
      disabled={isDeleteBlogLoading}
      onClick={() => onDelete(blog)}
    >
      Remove
    </button>
  );

  const expandedContent = (
    <>
      <div>
        <a href={`//${blog.url}`} target="_blank" rel="noreferrer noopener">
          {blog.url}
        </a>
      </div>
      <div>
        Likes {blog.likes}
        <button type="button" disabled={isUpdateBlogLoading} onClick={likeBlog}>
          like
        </button>
      </div>
      <div>Uploaded by {blog.user.name}</div>
      {deleteContent}
    </>
  );

  return (
    <div className="blog-entry">
      <b>{blog.title}</b> by {blog.author}
      <button
        className="expand-button"
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {buttonText}
      </button>
      {isExpanded && expandedContent}
    </div>
  );
}

export default Blog;
