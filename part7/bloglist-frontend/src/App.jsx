import { React } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import BlogList from './components/Blog/BlogList';
import './App.css';
import LoggedInMenu from './components/Login/LoggedInMenu';
import Notification from './components/Notification';
import UserList from './components/User/UserList';
import UserDetail from './components/User/UserDetail';
import Blog from './components/Blog/Blog';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const content = (
    <>
      <LoggedInMenu />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/blogs?" element={<BlogList />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/users" element={<UserList />} />
        </Route>
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
