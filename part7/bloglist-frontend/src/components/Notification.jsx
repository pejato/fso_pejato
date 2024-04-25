import React from 'react';
import { useSelector } from 'react-redux';

function Notification() {
  const { message, isError } = useSelector((state) => state.notification);

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
