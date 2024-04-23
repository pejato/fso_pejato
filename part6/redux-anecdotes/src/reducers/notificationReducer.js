import { createSlice } from '@reduxjs/toolkit';

let nextNotificationId = 0;
const notificationReducer = createSlice({
  name: 'notification',
  initialState: { message: null, id: null },
  reducers: {
    showNotification(state, action) {
      state.message = action.payload.message;
      state.id = action.payload.id;
    },
    removeNotification(state, action) {
      if (state.id === action.payload) {
        state.message = null;
        state.id = null;
      }
    },
  },
});

const { showNotification, removeNotification } = notificationReducer.actions;

export function setNotification(message, delayInSeconds = 5) {
  return (dispatch) => {
    const notificationId = nextNotificationId;
    nextNotificationId += 1;
    dispatch(showNotification({ message, id: notificationId }));
    setTimeout(() => {
      dispatch(removeNotification(notificationId));
    }, delayInSeconds * 1000);
  };
}

export default notificationReducer.reducer;
