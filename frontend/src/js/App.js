import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import Todo from './views/Todo';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/todo" component={Todo} />
      </BrowserRouter>
    </div>
  );
};

export default App;
