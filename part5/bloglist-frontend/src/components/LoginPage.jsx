import React from 'react';
import PropTypes from 'prop-types';
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
      <h2>Log in to Application</h2>
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
LoginPage.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
};
export default LoginPage;
