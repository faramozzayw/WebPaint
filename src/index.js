import React from 'react';
import ReactDOM from 'react-dom';

import { devToolsEnhancer } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './components/App';
import './css/index.css';

import * as serviceWorker from './serviceWorker';

//import * as reducers from './store/reducers';
const store = createStore(/*combineReducers(reducers),*/ applyMiddleware(thunk), devToolsEnhancer()) 


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();