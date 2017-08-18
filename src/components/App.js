import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { showCategories } from '../actions';
import * as API from '../utils/api';
import '../App.css';

class App extends Component {
  state = {
    categories: null,
  }

  componentDidMount() {
    const { store } = this.props;

    store.subscribe(() => {
      this.setState(() => ({
        categories: store.getState(),
      }));
    });
  }

  getCategories = () => {
    API.getCategories().then((cats) => {
      console.log(cats);
      this.props.store.dispatch(showCategories({categories: cats}));
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.getCategories}>Submit</button>
      </div>
    );
  }
}

export default App;
