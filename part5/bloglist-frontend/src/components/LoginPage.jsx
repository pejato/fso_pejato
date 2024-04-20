import React from 'react';
import LoginForm from './LoginForm';

function LoginPage({
  username,
  password,
  onSubmit,
  onUsernameChange,
  onPasswordChange,
}) {
  return (
    <div>
      <h2>Log in to application</h2>
      <LoginForm
        username={username}
        password={password}
        onSubmit={onSubmit}
        onUsernameChange={onUsernameChange}
        onPasswordChange={onPasswordChange}
      />
    </div>
  );
}

export default LoginPage;
