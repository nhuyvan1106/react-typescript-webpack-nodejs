import * as React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { Action } from './models/Action';
import { App } from './App/AppComponent';
import { rootReducer } from './root-reducers';

import './index.styles.scss';

const store = createStore(rootReducer, applyMiddleware(thunk, mapActionToPlainObj));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

function mapActionToPlainObj() {
  return next => action => {
    if (action instanceof Action)
      return next({ ...action });
    return next(action);
  }
}