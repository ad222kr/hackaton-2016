import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './style/index.css';

import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

console.log(window.gapi)



ReactDOM.render(
  <App />,
  document.getElementById('root')
);
