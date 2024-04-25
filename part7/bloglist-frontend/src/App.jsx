import { useState, useEffect, React, useRef } from 'react';
import { useDispatch } from 'react-redux';
import blogService from './services/blogs';
import LoginPage from './components/LoginPage';
import BlogList from './components/BlogList';
import loginService from './services/login';
import './App.css';
import LoggedInHeader from './components/LoggedInHeader';
import Notification from './components/Notification';
import CreateBlogForm from './components/CreateBlogForm';
import Togglable from './components/Togglable';
import { showNotification } from './reducers/notificationReducer';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    loginService.listenForUnauthenticated(() => setUser(null));
  });
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const userJSONString = window.localStorage.getItem('blogListUser');
    if (userJSONString) {
      const user = JSON.parse(userJSONString);
      loginService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const onLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem('blogListUser', JSON.stringify(user));
      setUsername('');
      setPassword('');
    } catch (error) {
      if (error.response?.data?.error) {
        dispatch(showNotification(error.response.data.error));
      } else {
        dispatch(showNotification('An unknown error occurred'));
      }
    }
  };
  const onCreatedBlog = (blog) => {
    blogFormRef.current.toggleVisibility();
    setBlogs(blogs.concat(blog));
  };
  const onLike = async (blog) => {
    try {
      const updatedBlog = await blogService.update({
        ...blog,
        likes: blog.likes + 1,
      });
      setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
    } catch (error) {
      if (error?.response?.data?.error) {
        dispatch(showNotification(error.response.data.error));
      } else {
        dispatch(showNotification(`Failed to like '${blog.title}'`));
      }
    }
  };
  const content =
    user === null ? (
      <LoginPage
        username={username}
        password={password}
        onSubmit={onLoginSubmit}
        onUsernameChange={(e) => setUsername(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
      />
    ) : (
      <>
        <h2>Blogs</h2>
        <LoggedInHeader setUser={setUser} user={user} />
        <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
          <CreateBlogForm onCreatedBlog={onCreatedBlog} />
        </Togglable>
        <BlogList
          currentUser={user}
          blogs={blogs}
          onLike={onLike}
          onDeleted={(blog) => setBlogs(blogs.filter((b) => b.id !== blog.id))}
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
