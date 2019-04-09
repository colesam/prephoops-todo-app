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
        <div className="col-8">
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
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center mt-2 mb-3">
                <h2 className="h5 mb-0">Todo Items</h2>
                <span className="h5 mb-0 text-danger">0/4</span>
              </div>
              <hr />
              <input
                type="text"
                className="form-control form-control-sm mb-3"
                placeholder="Filter"
              />
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  }
}

export default Todo;
