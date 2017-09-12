import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comment from './Comment';
import Sort from './Sort';

import {
  editCommentModal,
  updateWipComment,
} from '../actions';

class ListComments extends Component {
  constructor(props) {
    super(props);
    this.handleOpenCloseEditCommentModel = this.handleOpenCloseEditCommentModel.bind(this);
  }

  handleOpenCloseEditCommentModel(event, comment) {
    const { dispatch, modals } = this.props;
    if (modals.editPost === false && comment) {
      dispatch(editCommentModal(true, comment.id));
      this.loadEditComment(comment)
    } else {
      dispatch(editCommentModal(false, 0));
    }
  }

  loadEditComment(comment) {
    console.log("##########")
    console.log("##########")
    console.log("##########")
    console.log(comment)
    console.log("##########")
    console.log("##########")
    console.log("##########")
    const { dispatch } = this.props;
    dispatch(updateWipComment(comment.body, comment.author, comment.id));
  }

  render() {
    const {
      post,
      comments,
      modals,
      updatePage,
      handleInputChangeComment,
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
      <div className="list-comments">
        {commentList.map(comment => (
          <div key={comment.id}>
            <Comment
              comment={comment}
              modals={modals}
              updatePage={(page) => {
                updatePage(page);
              }}
              handleInputChangeComment={(event) => {
                handleInputChangeComment(event);
              }}
              handleOpenCloseEditCommentModel={(event, commentId) => {
                this.handleOpenCloseEditCommentModel(event, commentId);
              }}
            />
          </div>
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
