import { useState, useEffect, React } from 'react';
import blogService from './services/blogs';
import LoginPage from './components/LoginPage';
import BlogList from './components/BlogList';
import loginService from './services/login';
import './App.css';

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

  const onSubmit = async (event) => {
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

  return user === null ? (
    <LoginPage
      username={username}
      password={password}
      onSubmit={onSubmit}
      onUsernameChange={(e) => setUsername(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
    />
  ) : (
    <div>
      <h2>Blogs</h2>
      <div className="logged-in-label">
        Logged in as {user.name}{' '}
        <button
          type="button"
          onClick={() => {
            window.localStorage.removeItem('blogListUser');
            setUser(null);
          }}
        >
          Log out
        </button>
      </div>
      <BlogList blogs={blogs} />
    </div>
  );
}

export default App;
