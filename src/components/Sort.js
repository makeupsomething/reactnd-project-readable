
import React, { Component } from 'react';

class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'time'};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log('sorting by ' + event.target.value)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Sort By:
          <select value={undefined} onChange={this.handleChange}>
            <option value="date">Date</option>
            <option value="socre">Score</option>
          </select>
        </label>
      </form>
    );
  }
}

export default Sort;
