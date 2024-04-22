import React from 'react';
import { useSelector } from 'react-redux';

function Notification() {
  const notification = useSelector((state) => {
    return state.notification.message;
  });
  if (!notification) {
    return null;
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notification}</div>;
}

export default Notification;
