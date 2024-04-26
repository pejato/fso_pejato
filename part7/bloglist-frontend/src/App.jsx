import { React } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import BlogList from './components/BlogList';
import './App.css';
import LoggedInHeader from './components/LoggedInHeader';
import Notification from './components/Notification';
import UserList from './components/UserList';

function App() {
  const user = useSelector((state) => {
    return state.auth;
  });

  const content =
    user === null ? (
      <LoginPage />
    ) : (
      <>
        <h2>Blogs</h2>
        <LoggedInHeader user={user} />

        <Routes>
          <Route path="/blogs/:id" element={<div>TODO: Blog detail!</div>} />
          <Route path="/blogs?" element={<BlogList currentUser={user} />} />
          <Route path="/users/:id" element={<div>TODO: User detail!</div>} />
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
