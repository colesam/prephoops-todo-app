import React from 'react';
import { Redirect } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import TextField from '../components/TextField';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameError: null,
      passwordError: null,
      displayError: null,
      redirect: window.Api.isAuthenticated()
    };
  }

  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onLoginClick() {
    if (this.validateUsername() && this.validatePassword()) {
      window.Api.login(this.state.username, this.state.password)
        .then(() => {
          this.setState({ redirect: true });
        })
        .catch(displayError => {
          this.setState({ displayError });
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

  render() {
    if (this.state.redirect) {
      return <Redirect to="/todo" />;
    }

    let alert;
    if (this.state.displayError) {
      alert = (
        <div className="alert alert-danger">
          <strong>Error: </strong>
          {this.state.displayError}
        </div>
      );
    }

    return (
      <BaseLayout>
        <div className="col-6">
          <div className="card box-shadow">
            <div className="card-body">
              <div className="card-title mb-4">
                <h1 className="h3">Login</h1>
              </div>
              <div className="card-text">
                {alert}
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
                  isPassword
                  errorMessage={this.state.passwordError}
                  onChange={event => this.onPasswordChange(event)}
                  onBlur={() => this.validatePassword()}
                />
                <div className="row">
                  <div className="col-12 col-md-6">
                    <button
                      className="btn btn-primary form-control"
                      onClick={() => this.onLoginClick()}
                    >
                      Login
                    </button>
                  </div>
                  <div className="col-12 col-md-6">
                    <button className="btn btn-info form-control">
                      Register
                    </button>
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

export default Login;
