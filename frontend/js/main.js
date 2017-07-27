/* eslint-disable */
// Disabling all the rules that are broken (for the good) would be a
// long list, just disabling eslint here-- this shouldn't change much.
import CSS from '../css/application';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory, IndexRoute, Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import createStore from './store';

import App from './components/App';
import HelloWorld from './components/HelloWorld';

const store = createStore();
const history = syncHistoryWithStore(browserHistory, store)
render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route path="/" component={App}>
          <IndexRoute component={HelloWorld} />
        </Route>
      </div>
    </Router>
   </Provider>,
  document.getElementById('root')
);
