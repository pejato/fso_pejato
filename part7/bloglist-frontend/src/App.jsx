import { useState, React, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import blogService from './services/blogs';
import LoginPage from './components/LoginPage';
import BlogList from './components/BlogList';
import './App.css';
import LoggedInHeader from './components/LoggedInHeader';
import Notification from './components/Notification';
import CreateBlogForm from './components/CreateBlogForm';
import Togglable from './components/Togglable';
import { showNotification } from './reducers/notificationReducer';

function App() {
  const blogFormRef = useRef();

  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.auth;
  });

  const onCreatedBlog = (blog) => {
    blogFormRef.current.toggleVisibility();
    // TODO: Fix create
    // setBlogs(blogs.concat(blog));
  };
  const onLike = async (blog) => {
    try {
      const updatedBlog = await blogService.update({
        ...blog,
        likes: blog.likes + 1,
      });
      // TODO: Fix like logic
      // setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
    } catch (error) {
      if (error?.response?.data?.error) {
        dispatch(showNotification(error.response.data.error, true));
      } else {
        dispatch(showNotification(`Failed to like '${blog.title}'`, true));
      }
    }
  };
  const content =
    user === null ? (
      <LoginPage />
    ) : (
      <>
        <h2>Blogs</h2>
        <LoggedInHeader user={user} />
        <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
          <CreateBlogForm onCreatedBlog={onCreatedBlog} />
        </Togglable>
        <BlogList
          currentUser={user}
          onLike={onLike}
          onDeleted={(blog) => {
            // TODO: Fix delete logic
            // setBlogs(blogs.filter((b) => b.id !== blog.id))
          }}
        />
      </>
    );

  return (
    <div>
      <Notification />
      {content}
    </div>
  );
}

export default App;
