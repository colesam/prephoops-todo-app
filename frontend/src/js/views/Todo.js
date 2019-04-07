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

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return <div>Authenticated</div>;
  }
}

export default Todo;
