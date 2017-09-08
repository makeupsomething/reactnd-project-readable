import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import Post from './Post';
import CreateComment from './CreateComment';
import Sort from './Sort';

import {
  updateWipComment,
} from '../actions';

/**
* @description Component for listing the shelves
*/
class ListPosts extends Component {
  constructor(props) {
    super(props);
    this.handleInputChangeComment = this.handleInputChangeComment.bind(this);
  }

  handleInputChangeComment(event) {
    if (event) {
      const { dispatch, comments } = this.props;
      const target = event.target;
      let body = '';
      let owner = '';
      let parentId = '';
      if (target.name === 'body') {
        body = target.value;
        owner = comments.wip_owner;
        parentId = comments.wip_parentId;
        dispatch(updateWipComment(body, owner, parentId));
      } else if (target.name === 'owner') {
        body = comments.wip_body;
        owner = target.value;
        parentId = comments.wip_parentId;
        dispatch(updateWipComment(body, owner, parentId));
      } else if (target.name === 'parentId') {
        body = comments.wip_body;
        owner = comments.wip_owner;
        parentId = target.value;
        dispatch(updateWipComment(body, owner, parentId));
      }
    }
  }

  render() {
    const {
      posts,
      modals,
      comments,
      pages,
      categories,
      updatePage,
      handleInputChange,
      handleOpenCloseModel,
    } = this.props;

    let postList = [];

    if (posts.posts) {
      if (pages.current_page === 'home') {
        postList = posts.posts.filter(post => (post.deleted === false));
      } else if (categories.categories.indexOf(pages.current_page) > -1) {
        postList = posts.posts.filter(post => (!post.deleted && post.category === pages.current_page));
      } else {
        postList = posts.posts.filter(post => (post.deleted === false && post.id === pages.current_page));
      }
    }

    if (posts.sortBy === 'score') {
      postList.sort((a, b) => {
        return b.voteScore - a.voteScore;
      });
    } else if (posts.sortBy === 'date') {
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
              updatePage={(page) => {
                updatePage(page);
              }}
              handleInputChange={(event) => {
                handleInputChange(event);
              }}
              handleOpenCloseModel={(event) => {
                handleOpenCloseModel(event);
              }}
              handleInputChangeComment={(parentId) => {
                this.handleInputChangeComment(parentId);
              }}
            />
            <button name="add-comment-modal" value={post.id} onClick={handleOpenCloseModel}>
              Add Comment%
            </button>
            <Modal
              isOpen={modals.newComment}
              contentLabel="Modal"
            >
              <CreateComment
                parent={modals.parentId}
                handleInputChangeComment={(parentId) => {
                  this.handleInputChangeComment(parentId);
                }}
              />
            </Modal>
          </div>
        ))}
        <Sort
          isPost
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

export default connect(mapStateToProps)(ListPosts);
