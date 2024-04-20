import { React, useState } from 'react';
import blogService from '../services/blogs';

function CreateBlogForm({ onCreatedBlog }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const onChangeFactory = (setter) => {
    return (event) => {
      setter(event.target.value);
    };
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const blog = await blogService.create({ title, author, url });
      onCreatedBlog(blog);
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      console.log('Failed to create blog with error', error);
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

export default CreateBlogForm;
