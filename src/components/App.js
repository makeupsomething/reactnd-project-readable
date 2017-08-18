import React, { Component } from 'react';
import { fetchCategoriesIfNeeded } from '../actions';
import { connect } from 'react-redux';
import '../App.css';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCategoriesIfNeeded());
  }

  render() {
    const { categories } = this.props
    return (
      <div>
        {categories.categories}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { categories } = state

  //console.log("ll" + categories)

  return {
    categories,
  }
}

export default connect(mapStateToProps)(App)
