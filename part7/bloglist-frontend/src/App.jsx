import { React, useRef } from 'react';
import { useSelector } from 'react-redux';
import LoginPage from './components/LoginPage';
import BlogList from './components/BlogList';
import './App.css';
import LoggedInHeader from './components/LoggedInHeader';
import Notification from './components/Notification';
import CreateBlogForm from './components/CreateBlogForm';
import Togglable from './components/Togglable';

function App() {
  const blogFormRef = useRef();

  const user = useSelector((state) => {
    return state.auth;
  });

  const onCreatedBlog = () => {
    blogFormRef.current.toggleVisibility();
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
