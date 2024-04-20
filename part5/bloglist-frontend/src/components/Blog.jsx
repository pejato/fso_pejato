import React, { useContext, useState } from 'react';
import CreateNotificationContext from '../contexts/CreateNotificationContext';
import blogService from '../services/blogs';

function Blog({ currentUser, initialBlog, onDeleted }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [blog, setBlog] = useState(initialBlog);
  const createNotification = useContext(CreateNotificationContext);
  const buttonText = isExpanded ? 'Hide' : 'View';

  const onLike = async () => {
    try {
      const updatedBlog = await blogService.update({
        ...blog,
        likes: blog.likes + 1,
      });
      setBlog(updatedBlog);
    } catch (error) {
      if (error?.response?.data?.error) {
        createNotification({
          message: error.response.data.error,
          isError: true,
        });
      } else {
        createNotification({
          message: `Failed to like '${blog.title}'`,
          isError: true,
        });
      }
    }
  };

  const onDelete = async () => {
    try {
      if (window.confirm(`Are you sure you want to remove '${blog.title}'?`)) {
        await blogService.remove(blog);
        createNotification({ message: `Removed '${blog.title}'` });
        onDeleted(blog);
      }
    } catch (error) {
      if (error?.response?.data?.error) {
        createNotification({
          message: error.response.data.error,
          isError: true,
        });
      } else {
        createNotification({
          message: `Failed to delete '${blog.title}'`,
          isError: true,
        });
      }
    }
  };

  const deleteContent = currentUser.id === blog.user.id && (
    <button type="button" onClick={() => onDelete(blog)}>
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
        <button type="button" onClick={onLike}>
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
