import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/authReducer';

function LoggedInHeader() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  if (!user) {
    return null;
  }

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
