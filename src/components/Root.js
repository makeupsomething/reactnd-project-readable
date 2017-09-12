import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from '../configureStore';
import App from './App';

const store = configureStore();

const injectTouchTapEvent = require('react-tap-event-plugin');

injectTouchTapEvent();

export default class Root extends Component {
  render() {
    return ((
      <Provider store={store}>
        <BrowserRouter>
          <MuiThemeProvider>
            <Route path="/" component={App} />
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    ));
  }
}
