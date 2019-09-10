import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './pages/Routes';
import configureStore from './store';
import registerServiceWorker from './utilities/registerServiceWorker';

import './scss/style.scss';

const store = configureStore();
const applicationRoot = document.getElementById('root');

render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>,
  applicationRoot,
);

registerServiceWorker();
