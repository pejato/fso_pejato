import { React } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/authReducer';

function LoggedInHeader({ user }) {
  const dispatch = useDispatch();

  return (
    <div className="logged-in-label">
      Logged in as {user.name}{' '}
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
