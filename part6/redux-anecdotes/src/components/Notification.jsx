import React from 'react';
import { useSelector } from 'react-redux';

function Notification() {
  const notification = useSelector((state) => {
    console.log(state);
    return state.notification;
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
