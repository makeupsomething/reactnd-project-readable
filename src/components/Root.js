import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import App from './App';

const store = configureStore();

export default class Root extends Component {
  render() {
    return ((
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/" component={App} />
        </BrowserRouter>
      </Provider>
    ));
  }
}
