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
    const {posts, pages, comments, updatePage, updateWipCommentParentId, handleInputChangeComment, handleSubmitComment, doUpDownVote, deletePostOrComment } = this.props

    let postList = [];
    if (!pages.current_page) {
      postList = posts.posts;
    } else {
      if (!posts.posts) {
        postList = posts.posts;
      } else {
        if (pages.current_page !== 'home') {
          postList = posts.posts.filter(post => (post.deleted === false && post.category === pages.current_page));
        } else {
          postList = posts.posts.filter(post => (post.deleted === false));
        }
      }
    }

    if (!postList) {
      postList = [];
    }

    if(posts.sortBy === 'score') {
      postList.sort((a, b) => {
        return b.voteScore - a.voteScore;
      });
    } else if(posts.sortBy === 'date') {
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
              getComments={(id) => {
                this.getComments(id);
              }}
              comments={comments}
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
            />
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { categories, posts, comments, pages, modals } = state;

  return {
    categories,
    posts,
    comments,
    pages,
    modals,
  };
}

export default connect(mapStateToProps)(ListPosts);
