import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import Modal from 'react-modal';

import Categories from './Categories';
import ListPosts from './ListPosts';
import CreatePost from './CreatePost';
import ListComments from './ListComments';
import '../App.css';

import {
  fetchCategoriesIfNeeded,
  fetchPostsIfNeeded,
  finishEdit,
  updateWipPost,
  updateCurrentPage,
  updateWipComment,
  newPostModal,
  editPostModal,
  newCommentModal,
  editCommentModal,
} from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOpenCloseModel = this.handleOpenCloseModel.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategoriesIfNeeded());
    dispatch(fetchPostsIfNeeded());
    dispatch(updateCurrentPage('home'));
  }

  componentDidUpdate() {
    const { dispatch, pages, posts, comments } = this.props;
    if ((pages.current_page === 'home' && posts.editing) || comments.editing) {
      dispatch(finishEdit());
    }
  }

  handleInputChange(event) {
    if (event) {
      const { dispatch, posts } = this.props;
      const target = event.target;
      let title = '';
      let body = '';
      let category = '';
      let owner = '';
      if (target.name === 'title') {
        title = target.value;
        body = posts.wip_body;
        category = posts.wip_category;
        owner = posts.wip_owner;
        dispatch(updateWipPost(title, body, category, owner));
      } else if (target.name === 'body') {
        body = target.value;
        title = posts.wip_title;
        category = posts.wip_category;
        owner = posts.wip_owner;
        dispatch(updateWipPost(title, body, category, owner));
      } else if (target.name === 'category') {
        body = posts.wip_body;
        title = posts.wip_title;
        category = target.value;
        owner = posts.wip_owner;
        dispatch(updateWipPost(title, body, category, owner));
      } else if (target.name === 'owner') {
        body = posts.wip_body;
        title = posts.wip_title;
        category = posts.wip_category;
        owner = target.value;
        dispatch(updateWipPost(title, body, category, owner));
      }
    }
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

  updatePage(page) {
    const { dispatch } = this.props;
    dispatch(updateCurrentPage(page));
  }

  handleOpenCloseModel(event) {
    const { dispatch, modals } = this.props;
    if (event.target.name === 'new-post-modal') {
      if (modals.newPost === false) {
        dispatch(newPostModal(true));
      } else {
        dispatch(newPostModal(false));
      }
    } else if (event.target.name === 'edit-post-modal') {
      if (modals.editPost === false) {
        dispatch(editPostModal(true, event.target.value));
      } else {
        dispatch(editPostModal(false));
      }
    } else if (event.target.name === 'add-comment-modal') {
      if (modals.editPost === false) {
        dispatch(newCommentModal(true, event.target.value));
      } else {
        dispatch(newCommentModal(false, event.target.value));
      }
    } else if (event.target.name === 'edit-comment-modal') {
      if (modals.editPost === false) {
        dispatch(editCommentModal(true, event.target.value));
      } else {
        dispatch(editCommentModal(false, event.target.value));
      }
    }
  }

  render() {
    const { categories, posts, pages, modals } = this.props;
    let allCats = categories.categories;
    if (!allCats) {
      allCats = [];
    }

    return (
      <div>
        <Categories
          categories={categories}
          updatePage={(page) => {
            this.updatePage(page);
          }}
        />
        <button name="new-post-modal" onClick={this.handleOpenCloseModel}>
          New Post
        </button>
        <Modal
          isOpen={modals.newPost}
          contentLabel="Modal"
        >
          <CreatePost
            categories={categories}
            handleInputChange={(event) => {
              this.handleInputChange(event);
            }}
            handleOpenCloseModel={(event) => {
              this.handleOpenCloseModel(event);
            }}
          />
        </Modal>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <ListPosts
                  updatePage={(page) => {
                    this.updatePage(page);
                  }}
                  handleInputChange={(event) => {
                    this.handleInputChange(event);
                  }}
                  handleOpenCloseModel={(event) => {
                    this.handleOpenCloseModel(event);
                  }}
                  handleInputChangeComment={(parentId) => {
                    this.handleInputChangeComment(parentId);
                  }}
                />
              </div>
            )}
          />
          <Route
            path="/:category/:id"
            render={() => (
              (
                posts.posts.find(post => post.id === pages.current_page && !post.deleted) ? (
                  <div>
                    <ListPosts
                      updatePage={(page) => {
                        this.updatePage(page);
                      }}
                      handleInputChange={(event) => {
                        this.handleInputChange(event);
                      }}
                      handleInputChangeComment={(parentId) => {
                        this.handleInputChangeComment(parentId);
                      }}
                      handleOpenCloseModel={(event) => {
                        this.handleOpenCloseModel(event);
                      }}
                    />
                    <ListComments
                      post={posts.posts.find(post => post.id === pages.current_page)}
                      updatePage={(page) => {
                        this.updatePage(page);
                      }}
                      handleInputChangeComment={(event) => {
                        this.handleInputChangeComment(event);
                      }}
                      handleOpenCloseModel={(event) => {
                        this.handleOpenCloseModel(event);
                      }}
                    />
                  </div>) : (<Redirect to="/" />
                )
              )
            )}
          />
          <Route
            path="/:category"
            render={() => (
              <div>
                <ListPosts
                  handleInputChange={(event) => {
                    this.handleInputChange(event);
                  }}
                  updatePage={(page) => {
                    this.updatePage(page);
                  }}
                  handleInputChangeComment={(parentId) => {
                    this.handleInputChangeComment(parentId);
                  }}
                  handleOpenCloseModel={(event) => {
                    this.handleOpenCloseModel(event);
                  }}
                />
              </div>
            )}
          />
        </Switch>
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

export default connect(mapStateToProps)(App);
