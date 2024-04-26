import { React } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import BlogList from './components/Blog/BlogList';
import './App.css';
import LoggedInHeader from './components/Login/LoggedInHeader';
import Notification from './components/Notification';
import UserList from './components/User/UserList';
import UserDetail from './components/User/UserDetail';
import Blog from './components/Blog/Blog';

function App() {
  const hasAuthedUser = useSelector((state) => {
    return state.auth !== null;
  });

  const content =
    hasAuthedUser === null ? (
      <LoginPage />
    ) : (
      <>
        <h2>Blogs</h2>
        <LoggedInHeader />

        <Routes>
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/blogs?" element={<BlogList />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
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
