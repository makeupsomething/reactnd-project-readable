import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import Post from './Post';
import CreateComment from './CreateComment';
import Sort from './Sort';

import {
  updateWipComment,
  newCommentModal,
} from '../actions';

import Dialog from 'material-ui/Dialog';
/**
* @description Component for listing the shelves
*/
class ListPosts extends Component {
  constructor(props) {
    super(props);
    this.handleInputChangeComment = this.handleInputChangeComment.bind(this);
    this.handleOpenCloseAddCommentModel = this.handleOpenCloseAddCommentModel.bind(this);
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

  handleOpenCloseAddCommentModel(event, parentId) {
    const { dispatch, modals } = this.props;
    if (modals.newComment === false) {
      dispatch(newCommentModal(true, parentId));
    } else {
      dispatch(newCommentModal(false, parentId));
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
        <Sort
          isPost
          defaultSort={posts.sortBy}
        />
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
              handleOpenCloseAddCommentModel={(event, parentId) => {
                this.handleOpenCloseAddCommentModel(event, parentId);
              }}
              handleInputChangeComment={(parentId) => {
                this.handleInputChangeComment(parentId);
              }}
            />
            <Dialog
              title="Add Comment"
              repositionOnUpdate={ false }
              actions={
                <CreateComment
                  parent={modals.parentId}
                  handleInputChangeComment={(parentId) => {
                    this.handleInputChangeComment(parentId);
                  }}
                  handleOpenCloseAddCommentModel={(event, parentId) => {
                    this.handleOpenCloseAddCommentModel(event, parentId);
                  }}
                />
              }
              modal={false}
              open={modals.newComment}
              onRequestClose={this.handleOpenCloseAddCommentModel}
            />
          </div>
        ))}
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
