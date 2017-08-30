import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import Categories from './Categories';
import Post from './Post';
import ListPosts from './ListPosts';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import CreateComment from './CreateComment';
import EditComment from './EditComment';
import ListComments from './ListComments';
import Sort from './Sort'
import { Link, Switch } from 'react-router-dom';
import '../App.css';

import {
  fetchCategoriesIfNeeded,
  fetchPostsIfNeeded,
  addPostIfPossible,
  editPostIfPossible,
  finishEdit,
  updateWipPost,
  fetchCommentsIfNeeded,
  updateCurrentPage,
  addCommentIfPossible,
  editCommentIfPossible,
  updateWipComment,
  doUpDownVotePostIfPossible,
  doUpDownVoteCommentIfPossible,
  deletePostIfPossible,
  deleteCommentIfPossible,
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

  componentDidUpdate() {
    const { dispatch, pages, posts, comments } = this.props;
    if(pages.current_page === 'home' && posts.editing || comments.editing) {
      dispatch(finishEdit())
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

  loadEditPost(post) {
    const { dispatch } = this.props;
    let body = post.body;
    let title = post.title;
    let category = post.category;
    let owner = post.author;
    dispatch(updateWipPost(title, body, category, owner));
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

  handleSubmitEdit(event) {
    const { dispatch, posts, pages } = this.props;
    const id = pages.current_page;
    const title = posts.wip_title;
    const body = posts.wip_body;
    dispatch(editPostIfPossible(id, title, body));
    event.preventDefault();
    dispatch(updateCurrentPage('home'));
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

  loadEditComment(comment) {
    const { dispatch } = this.props;
    let body = comment.body;
    let parentId = comment.id;
    let owner = comment.author;
    dispatch(updateWipComment(body, owner, parentId));
  }

  handleSubmitEditComment(event) {
    const { dispatch, comments, pages } = this.props;
    const id = comments.wip_parentId;
    const timestamp = Date.now();
    const body = comments.wip_body;
    dispatch(editCommentIfPossible(id, timestamp, body));
    event.preventDefault();
    dispatch(updateCurrentPage('home'));
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
    const { dispatch, pages } = this.props;
    if(isPost) {
      dispatch(doUpDownVotePostIfPossible(vote, id));
    } else {
      dispatch(doUpDownVoteCommentIfPossible(vote, id, pages.current_page ));
    }
  }

  deletePostOrComment(isPost, id) {
    const { dispatch } = this.props;
    if(isPost) {
      console.log("dispatch delete post");
      dispatch(deletePostIfPossible(id));
    } else {
      dispatch(deleteCommentIfPossible(id));
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
                  deletePostOrComment={(isPost, id) => {
                    this.deletePostOrComment(isPost, id);
                  }}
                />
                <Sort/>
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
            path="/post/edit/:id"
            render={() => (
              (
                !posts.editing ? (
                  <div>
                    <EditPost
                      posts={posts}
                      post={posts.posts.find(post => post.id === pages.current_page)}
                      categories={categories}
                      handleInputChange={(event) => {
                        this.handleInputChange(event);
                      }}
                      handleSubmitEdit={(event) => {
                        this.handleSubmitEdit(event);
                      }}
                      updatePage={(page) => {
                        this.updatePage(page);
                      }}
                      loadEditPost={(post) => {
                        this.loadEditPost(post);
                      }}
                    />
                  </div>) : (
                    <Redirect to="/"/>
                  )
                )
            )}
          />
          <Route
            path="/comment/edit/:id"
            render={() => (
              (
                !comments.editing ? (
                  <div>
                    <EditComment
                      comments={comments}
                      comment={comments.comments.find(comment => comment.id === pages.current_page)}
                      categories={categories}
                      handleInputChangeComment={(event) => {
                        this.handleInputChangeComment(event);
                      }}
                      handleSubmitEditComment={(event) => {
                        this.handleSubmitEditComment(event);
                      }}
                      updatePage={(page) => {
                        this.updatePage(page);
                      }}
                      loadEditComment={(comment) => {
                        this.loadEditComment(comment);
                      }}
                    />
                  </div>) : (
                    <Redirect to="/"/>
                  )
                )
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
                  deletePostOrComment={(isPost, id) => {
                    this.deletePostOrComment(isPost, id);
                  }}
                />
                <ListComments
                  comments={comments.comments}
                  doUpDownVote={(isPost, vote, id) => {
                    this.doUpDownVote(isPost, vote, id);
                  }}
                  deletePostOrComment={(isPost, id) => {
                    this.deletePostOrComment(isPost, id);
                  }}
                  updatePage={(page) => {
                    this.updatePage(page);
                  }}
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
                  doUpDownVote={(isPost, id) => {
                    this.doUpDownVote(isPost, id);
                  }}
                  deletePostOrComment={(isPost, id) => {
                    this.deletePostOrComment(isPost, id);
                  }}
                />
                <Sort/>
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
