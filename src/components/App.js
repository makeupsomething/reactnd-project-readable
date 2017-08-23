import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import Categories from './Categories';
import ListPosts from './ListPosts';
import Post from './Post';
import CreatePost from './CreatePost';
import '../App.css';

import {
  fetchCategoriesIfNeeded,
  fetchPostsIfNeeded,
  addPostIfPossible,
  updateWipPost,
  fetchCommentsIfNeeded,
  updateCurrentPage,
} from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategoriesIfNeeded());
    dispatch(fetchPostsIfNeeded());
    dispatch(updateCurrentPage("home"));
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

  handleSubmit(event) {
    const { dispatch, posts } = this.props;
    const id = Math.random().toString(36).substr(-8);
    const timestamp = Date.now();
    const title = posts.wip_title;
    const body = posts.wip_body;
    const owner = posts.wip_owner;
    const category = posts.wip_category;
    dispatch(addPostIfPossible(id, timestamp, title, body, owner, category));
    event.preventDefault();
  }

  getComments(id) {
    const { dispatch } = this.props;
    dispatch(fetchCommentsIfNeeded(id));
  }

  updatePage(page) {
    console.log("updating page")
    const { dispatch } = this.props;
    dispatch(updateCurrentPage(page));
  }

  render() {
    const { categories, posts, pages } = this.props;
    let allCats = categories.categories;
    let postList = posts.posts;
    console.log("props")
    console.log(this.props)
    if (!allCats) {
      allCats = [];
    }
    if (!postList) {
      postList = [];
    }
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <Categories
                categories={categories}
                updatePage={(page) => {
                  this.updatePage(page);
                }}
              />
              <ListPosts
                posts={posts}
                pages={pages}
              />
            </div>
          )}
        />
        <Route
          path="/:category"
          render={() => (
            <div>
              <Categories
                categories={categories}
                updatePage={(page) => {
                  this.updatePage(page);
                }}
              />
              <ListPosts
                posts={posts}
                pages={pages}
              />
            </div>
          )}
        />
        <Route
          path="/:category/:id"
          render={() => (
            <div>
              <Post
                posts={posts}
                getComments={(id) => {
                  this.getComments(id);
                }}
              />
              <CreatePost
                categories={categories}
                handleInputChange={(event) => {
                  this.handleInputChange(event);
                }}
                handleSubmit={(event) => {
                  this.handleSubmit(event);
                }}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { categories, posts, comments, pages } = state;

  return {
    categories,
    posts,
    comments,
    pages,
  };
}

export default connect(mapStateToProps)(App);
