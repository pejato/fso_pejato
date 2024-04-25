import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

const authReducer = createSlice({
  name: 'auth',
  initialState: JSON.parse(window.localStorage.getItem('blogListUser')),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.login.matchFulfilled,
      (state, action) => {
        // TODO: This is super bad, don't use side effects in a reducer!
        window.localStorage.setItem(
          'blogListUser',
          JSON.stringify(action.payload),
        );
        return action.payload;
      },
    );
  },
});

export default authReducer.reducer;
