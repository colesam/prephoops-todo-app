import React from 'react';
import { Redirect } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import TodoItem from '../components/TodoItem';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todoNameFilter: '',
      redirect: !window.Api.isAuthenticated()
    };
  }

  componentDidMount() {
    window.Api.todos()
      .then(todosArr => {
        const todos = {};
        todosArr.forEach(todo => (todos[todo.id] = todo));
        this.setState({ todos });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onLogoutClick() {
    window.Api.logout().then(() => {
      this.setState({ redirect: true });
    });
  }

  onTodoNameFilterInput(event) {
    this.setState({ todoNameFilter: event.target.value });
  }

  onCheck(todoId, isChecked) {
    window.Api.setTodo(todoId, {
      is_checked: isChecked
    }).then(() => {
      const todos = this.state.todos;
      todos[todoId].isChecked = isChecked;
      this.setState({ todos });
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    let todosCompleted = 0;
    let todos = Object.keys(this.state.todos)
      .map(key => {
        const todo = this.state.todos[key];
        if (todo.isChecked) {
          todosCompleted++;
        }
        return todo;
      })
      .filter(todo => {
        const filterText = this.state.todoNameFilter.toLowerCase();
        return todo.name.toLowerCase().indexOf(filterText) >= 0;
      });

    const todoItems = todos.map((todo, index) => (
      <TodoItem
        id={todo.id}
        name={todo.name}
        isChecked={todo.isChecked}
        onCheck={(todoId, isChecked) => this.onCheck(todoId, isChecked)}
        key={index}
      />
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
                <span
                  className={
                    'h5 mb-0 ' +
                    (todosCompleted === todos.length
                      ? 'text-success'
                      : 'text-danger')
                  }
                >
                  {todosCompleted}/{todos.length}
                </span>
              </div>
              <hr />
              <input
                type="text"
                className="form-control form-control-sm mb-3"
                placeholder="Filter"
                onInput={event => this.onTodoNameFilterInput(event)}
              />
            </div>
            <ul className="list-group list-group-flush">{todoItems}</ul>
          </div>
        </div>
      </BaseLayout>
    );
  }
}

export default Todo;
