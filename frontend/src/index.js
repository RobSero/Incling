import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


import './styles/main.scss'
import './styles/homePage.scss'
import './styles/taskPage.scss'
import './styles/tile.scss'
import './styles/navbar.scss'
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
