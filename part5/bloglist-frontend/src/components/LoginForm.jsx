import React from 'react';
import PropTypes from 'prop-types';

function LoginForm({
  username,
  password,
  onSubmit,
  onUsernameChange,
  onPasswordChange,
}) {
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
      <button type="submit">Login</button>
    </form>
  );
}
LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
};
export default LoginForm;
