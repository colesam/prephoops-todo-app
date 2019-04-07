import React from 'react';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  render() {
    console.log(window.Api.isAuthenticated());
    // if (!window.Api.isAuthenticated()) {
    //   window.location = '/';
    // }

    return <div>Authenticated</div>;
  }
}

export default Todo;
