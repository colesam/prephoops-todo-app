import React from 'react';
import BaseLayout from './BaseLayout';
import TextField from '../components/TextField';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameError: null,
      passwordError: null
    };
  }

  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onLoginClick() {
    const usernameValid = this.validateUsername();
    if (usernameValid) {
      // submit request
    }
  }

  validateUsername() {
    const username = this.state.username;
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (username == null || username.length < 1) {
      this.setState({ usernameError: 'Please enter a username.' });
      return false;
    }

    if (!username.match(emailRegex)) {
      this.setState({ usernameError: 'Please enter a valid email address.' });
      return false;
    }

    this.setState({ usernameError: null });
    return true;
  }

  validatePassword() {
    const password = this.state.password;

    if (password == null || password.length < 1) {
      this.setState({ passwordError: 'Please enter a password.' });
      return false;
    }

    this.setState({ passwordError: null });
    return true;
  }

  render() {
    return (
      <BaseLayout>
        <div className="col-6">
          <div className="card box-shadow">
            <div className="card-body">
              <div className="card-title mb-4">
                <h1 className="h3">Login</h1>
              </div>
              <div className="card-text">
                <TextField
                  label="Username"
                  type="email"
                  id="username"
                  helpMessage="This should be the email address you signed up with."
                  errorMessage={this.state.usernameError}
                  onChange={event => this.onUsernameChange(event)}
                  onBlur={() => this.validateUsername()}
                />
                <TextField
                  label="Password"
                  type="password"
                  id="password"
                  isPassword={true}
                  errorMessage={this.state.passwordError}
                  onChange={event => this.onPasswordChange(event)}
                  onBlur={() => this.validatePassword()}
                />
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => this.onLoginClick()}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  }
}

export default Login;
