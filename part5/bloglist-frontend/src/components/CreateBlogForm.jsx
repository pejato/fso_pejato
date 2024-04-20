import { React, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';
import CreateNotificationContext from '../contexts/CreateNotificationContext';

function CreateBlogForm({ onCreatedBlog }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const createNotification = useContext(CreateNotificationContext);

  const onChangeFactory = (setter) => {
    return (event) => {
      setter(event.target.value);
    };
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const blog = await blogService.create({ title, author, url });
      createNotification({
        message: `Created a new blog with title: '${title}'`,
      });
      onCreatedBlog(blog);
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      if (error.response?.data?.error) {
        createNotification({
          message: error.response.data.error,
          isError: true,
        });
      } else {
        createNotification({
          message: 'Failed to create blog with an unknown error',
          isError: true,
        });
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
          type="text"
          value={title}
          onChange={onChangeFactory(setTitle)}
        />
      </div>
      <div>
        Author:
        <input
          className="form-input"
          type="text"
          value={author}
          onChange={onChangeFactory(setAuthor)}
        />
      </div>
      <div>
        URL:
        <input
          className="form-input"
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

CreateBlogForm.propTypes = {
  onCreatedBlog: PropTypes.func.isRequired,
};
export default CreateBlogForm;
