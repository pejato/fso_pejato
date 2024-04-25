import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

// TODO: This is super bad, don't use side effects in a reducer! Figure out a better way to interact with localStorage
const authReducer = createSlice({
  name: 'auth',
  initialState: JSON.parse(window.localStorage.getItem('blogListUser')),
  reducers: {
    logout() {
      window.localStorage.removeItem('blogListUser');
      return null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.login.matchFulfilled,
      (state, action) => {
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
export const { logout } = authReducer.actions;
