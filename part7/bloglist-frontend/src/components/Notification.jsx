import React from 'react';
import { useSelector } from 'react-redux';

// TODO: Implement isError handling again
function Notification() {
  const message = useSelector((state) => state.notification.message);
  const isError = false;

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
export default Notification;
