import React, { Component } from 'react';
import Post from './Post';
import { connect } from 'react-redux';
import {
  fetchCommentsIfNeeded,
} from '../actions';
/**
* @description Component for listing the shelves
*/
class ListPosts extends Component {
  getComments(id) {
    const { dispatch } = this.props;
    dispatch(fetchCommentsIfNeeded(id));
  }

  render() {
    const {posts, modals, sortedBy, comments, updatePage, updateWipCommentParentId, handleInputChangeComment, handleSubmitComment, doUpDownVote, deletePostOrComment, handleInputChange, handleSubmitEdit, loadEditPost, handleOpenCloseModel } = this.props

    let postList = posts.posts;

    if (!postList) {
      postList = [];
    }

    if(sortedBy === 'score') {
      postList.sort((a, b) => {
        return b.voteScore - a.voteScore;
      });
    } else if(sortedBy === 'date') {
      postList.sort((a, b) => {
        return b.timestamp - a.timestamp;
      });
    }

    return (
      <div className="list-books-content">
        {postList.map(post => (
          <div key={post.id}>
            <Post
              post={post}
              posts={posts}
              modals={modals}
              getComments={(id) => {
                this.getComments(id);
              }}
              comments={comments.comments.filter(comment => (comment.deleted === false && comment.parentId === post.id))}
              updatePage={(page) => {
                updatePage(page);
              }}
              updateWipCommentParentId={(parentId) => {
                updateWipCommentParentId(parentId);
              }}
              handleSubmitComment={(event) => {
                handleSubmitComment(event);
              }}
              handleInputChangeComment={(parentId) => {
                handleInputChangeComment(parentId);
              }}
              doUpDownVote={(isPost, vote, id) => {
                doUpDownVote(isPost, vote, id);
              }}
              deletePostOrComment={(isPost, id) => {
                deletePostOrComment(isPost, id);
              }}
              handleInputChange={(event) => {
                handleInputChange(event);
              }}
              handleSubmitEdit={(event) => {
                handleSubmitEdit(event);
              }}
              updatePage={(page) => {
                updatePage(page);
              }}
              loadEditPost={(post) => {
                loadEditPost(post);
              }}
              handleOpenCloseModel={(event) => {
                handleOpenCloseModel(event);
              }}
            />
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { posts, comments, modals } = state;

  return {
    comments,
    modals,
  };
}

export default connect(mapStateToProps)(ListPosts);
