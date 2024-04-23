import { createSlice } from '@reduxjs/toolkit';

const notificationReducer = createSlice({
  name: 'notification',
  initialState: { message: null },
  reducers: {
    showNotification(state, action) {
      state.message = action.payload;
    },
    removeNotification(state) {
      state.message = null;
    },
  },
});

const { showNotification, removeNotification } = notificationReducer.actions;

export function setNotification(message, delayInSeconds = 5) {
  return (dispatch) => {
    dispatch(showNotification(message));
    setTimeout(() => {
      dispatch(removeNotification());
    }, delayInSeconds * 1000);
  };
}

export default notificationReducer.reducer;
