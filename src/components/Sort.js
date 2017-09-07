
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  sortPosts,
  sortComments,
} from '../actions';

class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.sortPostsOrComments = this.sortPostsOrComments.bind(this);
  }

  handleChange(event) {
    const {isPost} = this.props;
    this.sortPostsOrComments(isPost, event.target.value)
  }

  sortPostsOrComments(isPost, sortBy) {
    const { dispatch } = this.props;
    if (isPost) {
      dispatch(sortPosts(sortBy));
    } else {
      dispatch(sortComments(sortBy));
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Sort By:
          <select value={undefined} onChange={this.handleChange}>
            <option value="date">Date</option>
            <option value="score">Score</option>
          </select>
        </label>
      </form>
    );
  }
}

function mapStateToProps(state) {
  const { } = state;

  return {
  };
}

export default connect(mapStateToProps)(Sort);
