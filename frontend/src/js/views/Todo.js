import React from 'react';
import { Redirect } from 'react-router-dom';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      redirect: !window.Api.isAuthenticated()
    };
  }

  onLogoutClick() {
    window.Api.logout().then(() => {
      this.setState({ redirect: true });
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <button className="btn btn-primary" onClick={() => this.onLogoutClick()}>
        Logout
      </button>
    );
  }
}

export default Todo;
