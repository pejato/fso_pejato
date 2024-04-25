import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';
import BlogType from '../prop-types/Blog';
import UserType from '../prop-types/User';
import CreateNotificationContext from '../contexts/CreateNotificationContext';

function Blog({ currentUser, blog, onLike, onDeleted }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const buttonText = isExpanded ? 'Hide' : 'View';
  const createNotification = useContext(CreateNotificationContext);

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
        <button type="button" onClick={() => onLike(blog)}>
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
Blog.propTypes = {
  currentUser: UserType.isRequired,
  blog: BlogType.isRequired,
  onLike: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
};

export default Blog;
