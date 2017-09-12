
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
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
    const { comments, posts, isPost } = this.props;

    let currentValue = 'date';
    if (isPost) {
      currentValue = posts.sortBy;
    } else {
      currentValue = comments.sortBy;
    }

    return (
      <div>
        <SelectField
          floatingLabelText={isPost ? 'Sort Posts' : 'Sort Comments'}
          value={currentValue}
          onChange={this.handleChange}
        >
          <MenuItem value="date" primaryText="Date" />
          <MenuItem value="score" primaryText="Score" />
        </SelectField>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { comments, posts } = state;

  return {
    comments,
    posts,
  };
}

export default connect(mapStateToProps)(Sort);
