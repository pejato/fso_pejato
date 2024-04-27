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
    <div className="p-2 mb-5 bg-stone-300 space-x-2">
      <Link to="/blogs" className="menu-link">
        Blogs
      </Link>
      <Link to="/users" className="menu-link pr-4">
        Users
      </Link>

      <div className="float-right space-x-2">
        <button
          className="menu-link"
          type="button"
          onClick={() => {
            dispatch(logout());
          }}
        >
          Log out
        </button>
        <span>Logged in as {user.name}</span>
      </div>
    </div>
  );
}

export default LoggedInHeader;
