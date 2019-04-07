import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './views/Login';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component={Login} />
      </BrowserRouter>
    </div>
  );
};

export default App;
