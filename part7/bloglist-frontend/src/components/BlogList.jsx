import React from 'react';
import PropTypes from 'prop-types';
import Blog from './Blog';
import UserType from '../prop-types/User';
import BlogType from '../prop-types/Blog';

function BlogList({ currentUser, blogs, onLike, onDeleted }) {
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
BlogList.propTypes = {
  currentUser: UserType.isRequired,
  blogs: PropTypes.arrayOf(BlogType).isRequired,
  onLike: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
};
export default BlogList;
