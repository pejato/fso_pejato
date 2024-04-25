import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../reducers/notificationReducer';
import { useCreateBlogMutation } from '../api/apiSlice';
import {
  clearFields,
  setAuthor,
  setTitle,
  setUrl,
} from '../reducers/createBlogFormReducer';

function CreateBlogForm({ onCreatedBlog }) {
  const state = useSelector((state) => state.createBlogForm);
  const dispatch = useDispatch();
  const [createBlog, { isLoading }] = useCreateBlogMutation();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const blog = await createBlog({ ...state }).unwrap();
      dispatch(
        showNotification(`Created a new blog with title: '${blog.title}'`),
      );
      onCreatedBlog();
      dispatch(clearFields());
    } catch (error) {
      dispatch(
        showNotification(error.data?.error ?? 'Something went wrong', true),
      );
    }
  };

  return (
    <form>
      <h2>Create a New Blog</h2>
      <div>
        Title:
        <input
          className="form-input"
          name="Title"
          type="text"
          value={state.title}
          onChange={(e) => dispatch(setTitle(e.target.value))}
        />
      </div>
      <div>
        Author:
        <input
          className="form-input"
          name="Author"
          type="text"
          value={state.author}
          onChange={(e) => dispatch(setAuthor(e.target.value))}
        />
      </div>
      <div>
        URL:
        <input
          className="form-input"
          name="URL"
          type="text"
          value={state.url}
          onChange={(e) => dispatch(setUrl(e.target.value))}
        />
      </div>
      <button type="submit" onClick={onSubmit} disabled={isLoading}>
        Create
      </button>
    </form>
  );
}

export default CreateBlogForm;
