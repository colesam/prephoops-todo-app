import React from 'react';
import ReactDOM from 'react-dom';
import Cookie from 'universal-cookie';
import Api from './js/Api';
import App from './js/App';
import env from './env.js';

window.env = env[process.env.NODE_ENV];
window.Api = new Api(window.env.API_URL);
window.cookie = new Cookie();

ReactDOM.render(<App />, document.getElementById('root'));
