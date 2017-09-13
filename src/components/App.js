import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import Categories from './Categories';
import ListPosts from './ListPosts';
import CreatePost from './CreatePost';
import ErrorPage from './ErrorPage';
import '../App.css';

import {
  fetchCategoriesIfNeeded,
  fetchPostsIfNeeded,
  finishEdit,
  updateWipPost,
  updateCurrentPage,
  newPostModal,
} from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.openCloseNewPostModel = this.openCloseNewPostModel.bind(this);
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

  updatePage(page) {
    const { dispatch } = this.props;
    dispatch(updateCurrentPage(page));
  }

  openCloseNewPostModel(event) {
    const { dispatch, modals } = this.props;
    if (modals.newPost === false) {
      dispatch(newPostModal(true));
    } else {
      dispatch(newPostModal(false));
    }
  }

  render() {
    const { categories, posts, pages, modals } = this.props;

    const style = {
      position: 'fixed',
      right: '20px',
      bottom: '20px',
    };

    let allCats = categories.categories;
    if (!allCats) {
      allCats = [];
    }

    return (
      <div>
        <AppBar
          title="Readable"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <FloatingActionButton style={style} onClick={this.openCloseNewPostModel}>
          <ContentAdd />
        </FloatingActionButton>
        <Categories
          categories={categories}
          updatePage={(page) => {
            this.updatePage(page);
          }}
        />
        <Dialog
          title="New Post"
          repositionOnUpdate={false}
          actions={
            <CreatePost
              categories={categories}
              handleInputChange={(event) => {
                this.handleInputChange(event);
              }}
              openCloseNewPostModel={(event) => {
                this.openCloseNewPostModel(event);
              }}
            />
          }
          modal={false}
          open={modals.newPost}
          onRequestClose={this.openCloseNewPostModel}
        >
          Make it readable
        </Dialog>
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
                />
              </div>
            )}
          />
          <Route
            path="/:category/:id"
            render={() => (
              (
                posts.posts ? (
                  posts.posts.find(post => post.id === pages.current_page && !post.deleted) ?
                  (<div>
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
                    />
                  </div>) :  (<Redirect to="/" />)) : (<Redirect to="/" />
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
