import React, { Component } from 'react';
import Comment from './Comment';
import { connect } from 'react-redux';
import Sort from './Sort';
/**
* @description Component for listing the shelves
*/
class ListComments extends Component {
  render() {
    const { post, comments, modals, updatePage, sortPostsOrComments, handleInputChangeComment, handleOpenCloseModel  }  = this.props
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
            updatePage={(page) => {
              updatePage(page);
            }}
            handleInputChangeComment={(event) => {
              handleInputChangeComment(event);
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
