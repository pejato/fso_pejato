import { createSlice } from '@reduxjs/toolkit';

let nextNotificationId = 0;
const getNewNotificationId = () => {
  const id = nextNotificationId;
  nextNotificationId += 1;
  return id;
};

const notificationReducer = createSlice({
  name: 'notification',
  initialState: { message: null, isError: false, id: null },
  reducers: (create) => ({
    setNotification: create.reducer((state, action) => {
      return action.payload;
    }),
    removeNotification: create.reducer((state, action) => {
      if (action.payload === state.id) {
        return { ...state, message: null };
      }
      return state;
    }),
  }),
});

export const { setNotification, removeNotification } =
  notificationReducer.actions;

export default notificationReducer.reducer;

export const showNotification = (message, isError = false) => {
  return (dispatch) => {
    const id = getNewNotificationId();
    dispatch(setNotification({ message, isError, id }));
    setTimeout(() => dispatch(removeNotification(id)), 5000);
  };
};
