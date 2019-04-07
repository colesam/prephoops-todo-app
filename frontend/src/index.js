import React from 'react';
import ReactDOM from 'react-dom';
import Api from './js/Api';
import App from './js/App';

window.Api = new Api('http://localhost:9000/');

ReactDOM.render(<App />, document.getElementById('root'));
