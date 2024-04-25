import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import blogService from '../services/blogs';
import { showNotification } from '../reducers/notificationReducer';

function CreateBlogForm({ onCreatedBlog }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const onChangeFactory = (setter) => {
    return (event) => {
      setter(event.target.value);
    };
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const blog = await blogService.create({ title, author, url });
      dispatch(showNotification(`Created a new blog with title: '${title}'`));
      onCreatedBlog(blog);
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      if (error.response?.data?.error) {
        dispatch(showNotification(error.response.data.error, true));
      } else {
        dispatch(
          showNotification('Failed to create blog with an unknown error', true),
        );
      }
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
      <button type="submit" onClick={onSubmit}>
        Create
      </button>
    </form>
  );
}

export default CreateBlogForm;
