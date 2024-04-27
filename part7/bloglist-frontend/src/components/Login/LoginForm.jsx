import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../api/apiSlice';
import { showNotification } from '../../reducers/notificationReducer';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    // TODO: Use middleware to handle errors
    try {
      await login({ username, password }).unwrap();
      navigate('/');
    } catch (error) {
      dispatch(
        showNotification(error.data?.error ?? 'Something went wrong', true),
      );
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="space-x-2">
        <span>Username</span>
        <input
          className="form-input"
          type="text"
          value={username}
          name="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="space-x-2">
        <span>Password</span>
        <input
          className="form-input"
          type="password"
          value={password}
          name="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="blue-button mt-1" type="submit" disabled={isLoading}>
        Login
      </button>
    </form>
  );
}
export default LoginForm;
