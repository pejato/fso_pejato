import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../reducers/authReducer';

function LoggedInHeader() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  if (!user) {
    return null;
  }

  return (
    <div className="logged-in-menu">
      <Link to="/blogs">Blogs</Link>
      <Link to="/users">Users</Link>
      <span>Logged in as {user.name}</span>

      <button
        type="button"
        onClick={() => {
          dispatch(logout());
        }}
      >
        Log out
      </button>
    </div>
  );
}

export default LoggedInHeader;
