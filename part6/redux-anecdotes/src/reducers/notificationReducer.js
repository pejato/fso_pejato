import { createSlice } from '@reduxjs/toolkit';

const notificationReducer = createSlice({
  name: 'notification',
  initialState: { message: null },
  reducers: {
    createNotification(state, action) {
      state.message = action.payload;
    },
    // eslint-disable-next-line no-unused-vars
    removeNotification(state, action) {
      state.message = null;
    },
  },
});

export const { createNotification, removeNotification } =
  notificationReducer.actions;
export function showNotificationWithTimeout(dispatch, message) {
  dispatch(createNotification(message));
  setTimeout(() => {
    dispatch(removeNotification());
  }, 5000);
}
export default notificationReducer.reducer;
