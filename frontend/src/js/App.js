import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import BaseLayout from './views/BaseLayout';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component={BaseLayout} />
      </BrowserRouter>
    </div>
  );
};

export default App;
