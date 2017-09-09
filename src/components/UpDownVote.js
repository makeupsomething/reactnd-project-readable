import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

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
    const { post, isPost, name } = this.props;
    const id = post.id;
    console.log(name)
    this.doUpDownVote(isPost, name, id);
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
    const { label } = this.props;

    const style = {
      margin: 5,
    };

    return (
      <RaisedButton style={style} label={label} onClick={this.handleClick} />
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
