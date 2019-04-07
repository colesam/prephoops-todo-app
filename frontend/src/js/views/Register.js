import React from 'react';
import BaseLayout from './BaseLayout';
import TextField from '../components/TextField';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      usernameError: null,
      passwordError: null,
      passwordConfirmError: null
    };
  }

  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onPasswordConfirmChange(event) {
    this.setState({ passwordConfirm: event.target.value });
  }

  onRegisterClick() {
    if (
      this.validateUsername() &&
      this.validatePassword() &&
      this.validatePasswordConfirm()
    ) {
      const { username, password, passwordConfirm } = this.state;
      window.Api.register(username, password, passwordConfirm)
        .then(() => {
          window.location = '/';
        })
        .catch(error => {
          const state = {};

          // Update component state if errors exist
          if (error.email) state.usernameError = error.email[0];
          if (error.password) state.passwordError = error.password[0];
          if (error.password_confirmation)
            state.passwordConfirm = error.password_confirmation[0];

          this.setState(state);
        });
    }
  }

  validateUsername() {
    const { username } = this.state;
    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

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
    const { password } = this.state;

    if (password == null || password.length < 1) {
      this.setState({ passwordError: 'Please enter a password.' });
      return false;
    }

    this.setState({ passwordError: null });
    return true;
  }

  validatePasswordConfirm() {
    const { passwordConfirm } = this.state;

    if (passwordConfirm !== this.state.password) {
      this.setState({ passwordConfirmError: 'Password does not match.' });
      return false;
    }

    this.setState({ passwordConfirmError: null });
    return true;
  }

  render() {
    return (
      <BaseLayout>
        <div className="col-6">
          <div className="card box-shadow">
            <div className="card-body">
              <div className="card-title mb-4">
                <h1 className="h3">Register</h1>
              </div>
              <div className="card-text">
                <TextField
                  label="Email"
                  type="email"
                  id="username"
                  helpMessage="This will be your username."
                  errorMessage={this.state.usernameError}
                  onChange={event => this.onUsernameChange(event)}
                  onBlur={() => this.validateUsername()}
                />
                <TextField
                  label="Password"
                  type="password"
                  id="password"
                  isPassword
                  errorMessage={this.state.passwordError}
                  onChange={event => this.onPasswordChange(event)}
                  onBlur={() => this.validatePassword()}
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  id="password-confirm"
                  isPassword
                  errorMessage={this.state.passwordConfirmError}
                  onChange={event => this.onPasswordConfirmChange(event)}
                  onBlur={() => this.validatePasswordConfirm()}
                />
                <div className="row">
                  <div className="col-12 col-md-6">
                    <button
                      className="btn btn-primary form-control"
                      onClick={() => this.onRegisterClick()}
                    >
                      Register
                    </button>
                  </div>
                  <div className="col-12 col-md-6">
                    <button className="btn btn-link form-control">Back</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  }
}

export default Register;
