import { createSlice } from '@reduxjs/toolkit';

const notificationReducer = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    createNotification(state, action) {
      state = action.payload;
    },
  },
});

export const { createNotification } = notificationReducer.actions;
export default notificationReducer.reducer;
