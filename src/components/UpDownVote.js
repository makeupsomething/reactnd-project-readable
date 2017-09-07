import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  doUpDownVotePostIfPossible,
  doUpDownVoteCommentIfPossible,
} from '../actions';
/**
* @description Component for listing the shelves
*/
class UpDownVote extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.doUpDownVote = this.doUpDownVote.bind(this);
  }

  handleClick(event) {
    const { post, isPost } = this.props;
    let id = post.id;
    this.doUpDownVote(isPost, event.target.name, id)
  }

  doUpDownVote(isPost, vote, id) {
    const { dispatch, pages } = this.props;
    if (isPost) {
      dispatch(doUpDownVotePostIfPossible(vote, id));
    } else {
      dispatch(doUpDownVoteCommentIfPossible(vote, id, pages.current_page));
    }
  }
  /**
  * @description The render function
  * @returns { object } The UI
  */
  render() {
    return (
      <div className="up-down-vote-group">
      <button name="upVote" onClick={this.handleClick}>
        Up
      </button>
      <button name="downVote" onClick={this.handleClick}>
        Down
      </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { pages } = state;

  return {
    pages,
  };
}

export default connect(mapStateToProps)(UpDownVote);
