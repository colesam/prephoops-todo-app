import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/register" component={Register} />
        <Route path="/" component={Login} />
      </BrowserRouter>
    </div>
  );
};

export default App;
