import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  author: '',
  url: '',
};

const createBlogFormReducer = createSlice({
  name: 'createBlogForm',
  initialState,
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
    },
    setAuthor(state, action) {
      state.author = action.payload;
    },
    setUrl(state, action) {
      state.url = action.payload;
    },
    clearFields() {
      return { ...initialState };
    },
  },
});

export const { setTitle, setAuthor, setUrl, clearFields } =
  createBlogFormReducer.actions;
export default createBlogFormReducer.reducer;
