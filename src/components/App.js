import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import Categories from './Categories';
import Post from './Post';
import ListPosts from './ListPosts';
import CreatePost from './CreatePost';
import CreateComment from './CreateComment';
import ListComments from './ListComments';
import { Link, Switch } from 'react-router-dom';
import '../App.css';

import {
  fetchCategoriesIfNeeded,
  fetchPostsIfNeeded,
  addPostIfPossible,
  updateWipPost,
  fetchCommentsIfNeeded,
  updateCurrentPage,
  addCommentIfPossible,
  updateWipComment,
  doUpDownVotePostIfPossible,
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
    dispatch(updateCurrentPage('home'));
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

  handleSubmitComment(event) {
    const { dispatch, comments } = this.props;
    const id = Math.random().toString(36).substr(-8);
    const timestamp = Date.now();
    const body = comments.wip_body;
    const owner = comments.wip_owner;
    const parentId = comments.wip_parentId;
    dispatch(addCommentIfPossible(id, timestamp, body, owner, parentId));
    event.preventDefault();
  }

  updateWipCommentParentId(parentId) {
    const { dispatch, comments } = this.props;
    let body = comments.wip_body;
    let owner = comments.wip_owner;
    dispatch(updateWipComment(body, owner, parentId));
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

  doUpDownVote(isPost, vote, id) {
    const { dispatch } = this.props;
    if(isPost) {
      dispatch(doUpDownVotePostIfPossible(vote, id));
    } else {
      console.log("dispatch the vote function for comments");
    }
  }

  render() {
    const { categories, posts, pages, comments } = this.props;
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
        <Switch>
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
                  getComments={(id) => {
                    this.getComments(id);
                  }}
                  comments={comments}
                  updatePage={(page) => {
                    this.updatePage(page);
                  }}
                  updateWipCommentParentId={(parentId) => {
                    this.updateWipCommentParentId(parentId);
                  }}
                  handleSubmitComment={(event) => {
                    this.handleSubmitComment(event);
                  }}
                  handleInputChangeComment={(parentId) => {
                    this.handleInputChangeComment(parentId);
                  }}
                  doUpDownVote={(isPost, vote, id) => {
                    this.doUpDownVote(isPost, vote, id);
                  }}
                />
                <Link
                  to={`/new`}
                  className="add-new-post"
                  value="add-new-post">
                  Add New Post
                </Link>
              </div>
            )}
          />
          <Route
            path="/new"
            render={() => (
              <div>
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
          <Route
            path="/edit"
            render={() => (
              <div>
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
          <Route
            path="/:category/:id"
            render={() => (
              <div>
                <Post
                  post={posts.posts.find(post => post.id === pages.current_page)}
                  getComments={(id) => {
                    this.getComments(id);
                  }}
                  comments={comments}
                  updatePage={(page) => {
                    this.updatePage(page);
                  }}
                  updateWipCommentParentId={(parentId) => {
                    this.updateWipCommentParentId(parentId);
                  }}
                  handleSubmitComment={(event) => {
                    this.handleSubmitComment(event);
                  }}
                  handleInputChangeComment={(parentId) => {
                    this.handleInputChangeComment(parentId);
                  }}
                  doUpDownVote={(isPost, vote, id) => {
                    this.doUpDownVote(isPost, vote, id);
                  }}
                />
                <ListComments
                  comments={comments.comments}
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
                  getComments={(id) => {
                    this.getComments(id);
                  }}
                  comments={comments}
                  updatePage={(page) => {
                    this.updatePage(page);
                  }}
                  updateWipCommentParentId={(parentId) => {
                    this.updateWipCommentParentId(parentId);
                  }}
                  handleSubmitComment={(event) => {
                    this.handleSubmitComment(event);
                  }}
                  handleInputChangeComment={(parentId) => {
                    this.handleInputChangeComment(parentId);
                  }}
                  doUpDownVote={(isPost, vote, id) => {
                    this.doUpDownVote(isPost, vote, id);
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
  const { categories, posts, comments, pages } = state;

  return {
    categories,
    posts,
    comments,
    pages,
  };
}

export default connect(mapStateToProps)(App);
