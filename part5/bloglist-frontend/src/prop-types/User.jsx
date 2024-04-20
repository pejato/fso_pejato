import PropTypes from 'prop-types';

const UserType = PropTypes.shape({
  username: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
});

export default UserType;
