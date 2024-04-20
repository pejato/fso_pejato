import PropTypes from 'prop-types';
import UserType from './User';

const BlogType = PropTypes.shape({
  likes: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  user: UserType.isRequired,
});

export default BlogType;
