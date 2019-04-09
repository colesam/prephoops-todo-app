import React from 'react';
import { Redirect } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import TodoItem from '../components/TodoItem';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [{ name: 'test' }],
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

    const todoItems = this.state.todos.map((todo, index) => (
      <TodoItem name={todo.name} isChecked={true} key={index} />
    ));

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
            <ul className="list-group list-group-flush">
              {todoItems}
              <li className="list-group-item">
                <div className="row">
                  <div className="col-2 d-flex align-items-center">
                    <div className="checkbox" />
                  </div>
                  <div className="col-6 d-flex align-items-center">
                    Walk dog
                  </div>
                  <div className="col-3 d-flex align-items-center">
                    <button className="btn btn-sm btn-warning w-100">
                      in progress
                    </button>
                  </div>
                  <div className="col-1 d-flex justify-content-center align-items-center">
                    <i className="fas fa-trash-alt text-danger" />
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-2 d-flex align-items-center">
                    <div className="checkbox" />
                  </div>
                  <div className="col-6 d-flex align-items-center">
                    Feed cat
                  </div>
                  <div className="col-3 d-flex align-items-center">
                    <button className="btn btn-sm btn-danger w-100">
                      priority
                    </button>
                  </div>
                  <div className="col-1 d-flex justify-content-center align-items-center">
                    <i className="fas fa-trash-alt text-danger" />
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-2 d-flex align-items-center">
                    <div className="checkbox" />
                  </div>
                  <div className="col-6 d-flex align-items-center">
                    Move iguana
                  </div>
                  <div className="col-3 d-flex align-items-center">
                    <button className="btn btn-sm btn-secondary w-100">
                      on hold
                    </button>
                  </div>
                  <div className="col-1 d-flex justify-content-center align-items-center">
                    <i className="fas fa-trash-alt text-danger" />
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-2 d-flex align-items-center">
                    <div className="checkbox" />
                  </div>
                  <div className="col-6 d-flex align-items-center text-muted strike-through">
                    Move second iguana
                  </div>
                  <div className="col-3 d-flex align-items-center">
                    <button className="btn btn-sm btn-light w-100">none</button>
                  </div>
                  <div className="col-1 d-flex justify-content-center align-items-center">
                    <i className="fas fa-trash-alt text-danger" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </BaseLayout>
    );
  }
}

export default Todo;
