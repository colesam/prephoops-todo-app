import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';

const TestComponent = () => {
  return (
    <h1>HelloWorld</h1>
  );
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route path="/test" component={TestComponent}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
