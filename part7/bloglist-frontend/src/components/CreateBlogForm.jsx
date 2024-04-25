import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from '../reducers/notificationReducer';
import { useCreateBlogMutation } from '../api/apiSlice';

function CreateBlogForm({ onCreatedBlog }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();
  const [createBlog, { isLoading }] = useCreateBlogMutation();

  const onChangeFactory = (setter) => {
    return (event) => {
      setter(event.target.value);
    };
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const blog = await createBlog({ title, author, url }).unwrap();
      dispatch(
        showNotification(`Created a new blog with title: '${blog.title}'`),
      );
      onCreatedBlog();
      setTitle('');
      setAuthor('');
      setUrl('');
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
          value={title}
          onChange={onChangeFactory(setTitle)}
        />
      </div>
      <div>
        Author:
        <input
          className="form-input"
          name="Author"
          type="text"
          value={author}
          onChange={onChangeFactory(setAuthor)}
        />
      </div>
      <div>
        URL:
        <input
          className="form-input"
          name="URL"
          type="text"
          value={url}
          onChange={onChangeFactory(setUrl)}
        />
      </div>
      <button type="submit" onClick={onSubmit} disabled={isLoading}>
        Create
      </button>
    </form>
  );
}

export default CreateBlogForm;
