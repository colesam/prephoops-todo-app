import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

const TestComponent = () => {
  return <h1>HelloWorld</h1>;
};

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/test" component={TestComponent} />
      </BrowserRouter>
    </div>
  );
};

export default App;
