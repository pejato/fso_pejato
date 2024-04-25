import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import { apiSlice } from './api/apiSlice';
import authReducer from './reducers/authReducer';
import createBlogFormReducer from './reducers/createBlogFormReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    auth: authReducer,
    createBlogForm: createBlogFormReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiSlice.middleware]),
});

export default store;
