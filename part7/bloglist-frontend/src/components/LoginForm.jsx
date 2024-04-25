import React from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../api/apiSlice';
import { showNotification } from '../reducers/notificationReducer';

function LoginForm({ username, password, onUsernameChange, onPasswordChange }) {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    // TODO: Use middleware to handle errors
    try {
      await login({ username, password }).unwrap();
    } catch (error) {
      dispatch(
        showNotification(error.data?.error ?? 'Something went wrong', true),
      );
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <div>
        Username
        <input
          className="form-input"
          type="text"
          value={username}
          name="Username"
          onChange={onUsernameChange}
        />
      </div>
      <div>
        Password
        <input
          className="form-input"
          type="password"
          value={password}
          name="Password"
          onChange={onPasswordChange}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        Login
      </button>
    </form>
  );
}
export default LoginForm;
