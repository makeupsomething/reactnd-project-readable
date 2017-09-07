import React, { Component } from 'react';
import Comment from './Comment';
import { connect } from 'react-redux';
import Sort from './Sort';
/**
* @description Component for listing the shelves
*/
class ListComments extends Component {
  render() {
    const { post, comments, modals, doUpDownVote, deletePostOrComment, updatePage, sortPostsOrComments, handleInputChangeComment, handleSubmitEditComment, loadEditComment, handleOpenCloseModel  }  = this.props
    let commentList = [];
    if (!comments) {
      commentList = [];
    } else {
        commentList = comments.comments.filter(comment => comment.deleted === false && comment.parentId === post.id);
    }

    if(comments.sortBy === 'score') {
      commentList.sort((a, b) => {
        return b.voteScore - a.voteScore;
      });
    } else if(comments.sortBy === 'date') {
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
            comments={comments}
            doUpDownVote={(isPost, vote, id) => {
              doUpDownVote(isPost, vote, id);
            }}
            deletePostOrComment={(isPost, id) => {
              deletePostOrComment(isPost, id);
            }}
            updatePage={(page) => {
              updatePage(page);
            }}
            handleInputChangeComment={(event) => {
              handleInputChangeComment(event);
            }}
            handleSubmitEditComment={(event) => {
              handleSubmitEditComment(event);
            }}
            loadEditComment={(comment) => {
              loadEditComment(comment);
            }}
            handleOpenCloseModel={(event) => {
              handleOpenCloseModel(event);
            }}
          />
        ))}
        <Sort
          isPost={false}
          sortPostsOrComments={(isPost, sortBy) => {
            sortPostsOrComments(isPost, sortBy);
          }}
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
    categories
  };
}

export default connect(mapStateToProps)(ListComments);
