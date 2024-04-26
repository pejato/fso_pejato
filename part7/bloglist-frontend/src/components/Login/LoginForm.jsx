import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../api/apiSlice';
import { showNotification } from '../../reducers/notificationReducer';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        Password
        <input
          className="form-input"
          type="password"
          value={password}
          name="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        Login
      </button>
    </form>
  );
}
export default LoginForm;
