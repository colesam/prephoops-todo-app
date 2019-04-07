import React from 'react';
import ReactDOM from 'react-dom';
import Cookie from 'universal-cookie';
import Api from './js/Api';
import App from './js/App';

window.Api = new Api('http://localhost:9000/');
window.cookie = new Cookie();

ReactDOM.render(<App />, document.getElementById('root'));
