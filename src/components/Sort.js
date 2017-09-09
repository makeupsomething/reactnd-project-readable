
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import {
  sortPosts,
  sortComments,
} from '../actions';

class Sort extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.sortPostsOrComments = this.sortPostsOrComments.bind(this);
  }

  handleChange(event, index, value) {
    const { isPost } = this.props;
    this.sortPostsOrComments(isPost, value);
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
    const { defaultSort } = this.props;
    //var injectTapEventPlugin = require("react-tap-event-plugin");
    //injectTapEventPlugin();

    return (
      <DropDownMenu value={defaultSort} onChange={this.handleChange}>
        <MenuItem value="date" primaryText="Date (newest first)" />
        <MenuItem value="score" primaryText="Score (high to low)" />
      </DropDownMenu>
    );
  }
}

function mapStateToProps(state) {
  const { } = state;

  return {
  };
}

export default connect(mapStateToProps)(Sort);
