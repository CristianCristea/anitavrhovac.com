import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { startLogin } from './../../../actions/auth';
import logo from './../../../images/av-logo.png';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import './Login.scss';

// disable submit btn based on input
export const Login = ({ dispatch }) => {
  const loginSubmit = e => {
    e.preventDefault();
    let username = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    dispatch(startLogin(username, password));
  };
  return (
    <section className="login">
      <div className="login__container">
        <img src={logo} alt="logo" className="login__logo" />

        <div className="login__form__container">
          <form onSubmit={loginSubmit} className="login__form">
            <div className="login__form__control">
              <AccountCircle />
              <TextField
                required
                id="email"
                label="Email"
                type="email"
                name="email"
                margin="normal"
                variant="outlined"
              />
            </div>

            <div className="login__form__control">
              <Lock />
              <TextField
                required
                id="password"
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="login__form__submitBtn"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default connect()(Login);
// <label htmlFor="name" />
// <input
//   type="text"
//   id="name"
//   name="name"
//   placeholder="Username"
//   autoComplete="username"
// />
// <label htmlFor="password" />
// <input
//   type="password"
//   id="password"
//   name="password"
//   placeholder="Password"
//   autoComplete="current-password"
// />
