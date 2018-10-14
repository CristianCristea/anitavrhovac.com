import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from './../../../actions/auth';

// disable submit btn based on input
export const Login = ({ dispatch }) => {
  const loginSubmit = e => {
    e.preventDefault();
    let username = document.getElementById('name').value;
    let password = document.getElementById('password').value;
    dispatch(startLogin(username, password));
  };
  return (
    <div>
      <h1>Admin login</h1>
      <form onSubmit={loginSubmit}>
        <label htmlFor="name" />
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Username"
          autoComplete="username"
        />
        <label htmlFor="password" />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default connect()(Login);
