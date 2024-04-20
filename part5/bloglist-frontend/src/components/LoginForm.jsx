import React from 'react';

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
export default LoginForm;