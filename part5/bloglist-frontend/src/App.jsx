import { useState, useEffect, React } from 'react';
import blogService from './services/blogs';
import LoginPage from './components/LoginPage';
import BlogList from './components/BlogList';
import loginService from './services/login';
import './App.css';
import { LoggedInHeader } from './components/LoggedInHeader';
import CreateBlogForm from './components/CreateBlogForm';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      console.log('Login failed with error', error);
    }
  };
  const onCreatedBlog = (blog) => {
    setBlogs(blogs.concat(blog));
  };
  return user === null ? (
    <LoginPage
      username={username}
      password={password}
      onSubmit={onLoginSubmit}
      onUsernameChange={(e) => setUsername(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
    />
  ) : (
    <div>
      <h2>Blogs</h2>
      <LoggedInHeader setUser={setUser} user={user} />
      <CreateBlogForm onCreatedBlog={onCreatedBlog} />
      <BlogList blogs={blogs} />
    </div>
  );
}

export default App;
