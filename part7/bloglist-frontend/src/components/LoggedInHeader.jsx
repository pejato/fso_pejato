import { React } from 'react';
import UserType from '../prop-types/User';

function LoggedInHeader({ setUser, user }) {
  return (
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
  );
}

export default LoggedInHeader;
