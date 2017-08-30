
import React, { Component } from 'react';

class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { sortPostsOrComments, isPost} = this.props;
    sortPostsOrComments(isPost, event.target.value)
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

export default Sort;
