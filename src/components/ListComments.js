import React, { Component } from 'react';
import Comment from './Comment';
import { connect } from 'react-redux';
import Sort from './Sort';

import {
  editCommentModal,
} from '../actions';
/**
* @description Component for listing the shelves
*/
class ListComments extends Component {
  constructor(props) {
    super(props);
    this.handleOpenCloseEditCommentModel = this.handleOpenCloseEditCommentModel.bind(this);
  }

  handleOpenCloseEditCommentModel(event, commentId) {
    const { dispatch, modals } = this.props;
    if (modals.editPost === false) {
      dispatch(editCommentModal(true, commentId));
    } else {
      dispatch(editCommentModal(false, commentId));
    }
  }

  render() {
    const {
      post,
      comments,
      modals,
      updatePage,
      handleInputChangeComment,
      handleOpenCloseModel,
    } = this.props;

    let commentList = [];
    if (!comments) {
      commentList = [];
    } else {
      commentList = comments.comments.filter(c => !c.deleted && c.parentId === post.id);
    }

    if (comments.sortBy === 'score') {
      commentList.sort((a, b) => {
        return b.voteScore - a.voteScore;
      });
    } else if (comments.sortBy === 'date') {
      commentList.sort((a, b) => {
        return b.timestamp - a.timestamp;
      });
    }

    return (
      <div className="list-books-content">
        {commentList.map(comment => (
          <Comment
            comment={comment}
            modals={modals}
            updatePage={(page) => {
              updatePage(page);
            }}
            handleInputChangeComment={(event) => {
              handleInputChangeComment(event);
            }}
            handleOpenCloseEditCommentModel={(event, parentId) => {
              this.handleOpenCloseEditCommentModel(event, parentId);
            }}
          />
        ))}
        <Sort
          isPost={false}
        />
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { posts, comments, modals, pages, categories } = state;

  return {
    posts,
    comments,
    modals,
    pages,
    categories,
  };
}

export default connect(mapStateToProps)(ListComments);
