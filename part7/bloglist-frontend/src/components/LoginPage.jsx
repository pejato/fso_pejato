import React from 'react';
import LoginForm from './LoginForm';

function LoginPage({ username, password, onUsernameChange, onPasswordChange }) {
  return (
    <div>
      <h2>Log in to Application</h2>
      <LoginForm
        username={username}
        password={password}
        onUsernameChange={onUsernameChange}
        onPasswordChange={onPasswordChange}
      />
    </div>
  );
}
export default LoginPage;
