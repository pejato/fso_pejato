import React from 'react';
import PropTypes from 'prop-types';

function Notification({ message, isError }) {
  if (!message) {
    return null;
  }

  const style = {
    color: isError ? 'red' : 'green',
    background: 'lightgrey',
    borderRadius: 5,
    borderStyle: 'solid',
    padding: 10,
    fontSize: 20,
    marginBottom: 20,
  };

  return <div style={style}>{message}</div>;
}
Notification.defaultProps = {
  message: undefined,
  isError: undefined,
};
Notification.propTypes = {
  message: PropTypes.string,
  isError: PropTypes.bool,
};
export default Notification;
