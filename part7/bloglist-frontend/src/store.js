import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import { apiSlice } from './api/apiSlice';
import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiSlice.middleware]),
});

export default store;
