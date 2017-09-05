import React, { Component } from 'react';
import Post from './Post';
import ListComments from './ListComments';
import { connect } from 'react-redux';
import Sort from './Sort';
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
    const {posts, modals, sortedBy, comments, updatePage, doUpDownVote, deletePostOrComment, handleInputChange, handleOpenCloseModel, sortPostsOrComments } = this.props

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
              doUpDownVote={(isPost, vote, id) => {
                doUpDownVote(isPost, vote, id);
              }}
              deletePostOrComment={(isPost, id) => {
                deletePostOrComment(isPost, id);
              }}
              handleInputChange={(event) => {
                handleInputChange(event);
              }}
              updatePage={(page) => {
                updatePage(page);
              }}
              handleOpenCloseModel={(event) => {
                handleOpenCloseModel(event);
              }}
            />
          </div>
        ))}
        <Sort
          isPost={true}
          sortPostsOrComments={(isPost, sortBy) => {
            sortPostsOrComments(isPost, sortBy);
          }}
        />
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
