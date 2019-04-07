import React from 'react';
import BaseLayout from './BaseLayout';
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
      <BaseLayout navbar={true}>
        <div className="col-6">
          <div className="card box-shadow mb-5">
            <div className="card-body d-flex flex-row justify-content-between">
              <h1 className="h3 m-0">Todo App</h1>
              <button
                className="btn btn-light"
                onClick={() => this.onLogoutClick()}
              >
                Logout
              </button>
            </div>
          </div>
          <div className="card box-shadow">
            <div className="card-body">
              <div className="card-text" />
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  }
}

export default Todo;
