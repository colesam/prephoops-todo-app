import React from 'react';
import TextField from '../components/TextField';

class CreateTodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', error: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let { value } = event.target;
    this.setState({ value });
  }

  validate(value) {
    if (value.length < 3) {
      this.setState({ error: 'Name must be at least 3 characters.' });
      return false;
    }

    if (value.length > 100) {
      this.setState({ error: 'Name cannot be longer than 100 characters.' });
      return false;
    }

    this.setState({ error: '' });
    return true;
  }

  handleSubmit(event) {
    event.preventDefault();
    const { value } = this.state;
    const { onSubmit } = this.props;
    if (this.validate(value)) {
      onSubmit(this.state.value);
      this.setState({ value: '' });
    }
  }

  render() {
    const { value, error } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          placeholder="Create todo"
          initialValue={value}
          onChange={value => this.handleChange(value)}
          errorMessage={error}
        />
      </form>
    );
  }
}

export default CreateTodoForm;
