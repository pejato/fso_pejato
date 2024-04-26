import { React } from 'react';
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
  const content = (
    <>
      <h2>Blogs</h2>
      <LoggedInHeader />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
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
