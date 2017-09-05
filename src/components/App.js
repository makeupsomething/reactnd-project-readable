import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Link, Switch } from 'react-router-dom';
import Modal from 'react-modal'
import Categories from './Categories';
import Post from './Post';
import ListPosts from './ListPosts';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import CreateComment from './CreateComment';
import EditComment from './EditComment';
import ListComments from './ListComments';
import Sort from './Sort';
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
  sortPosts,
  sortComments,
  newPostModal,
  editPostModal,
} from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    if(pages.current_page === 'home' && posts.editing || comments.editing) {
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
    dispatch(newPostModal(false));

  }

  handleSubmitEdit(event) {
    const { dispatch, posts, pages, modals } = this.props;
    const id = modals.postId;
    const title = posts.wip_title;
    const body = posts.wip_body;
    console.log("editing post")
    console.log(id)
    console.log(title)
    console.log(body)
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
    const { dispatch, pages, categories } = this.props;
    if(isPost) {
      console.log("dispatch delete post");
      dispatch(deletePostIfPossible(id));
      if(pages.current_page !== 'home' && !categories.categories.find(cat => cat === pages.current_page)) {
        dispatch(updateCurrentPage('home'));
      }
    } else {
      dispatch(deleteCommentIfPossible(id));
    }
  }

  sortPostsOrComments(isPost, sortBy) {
    const { dispatch } = this.props;
    if(isPost) {
      console.log("dispatch sortPosts");
      dispatch(sortPosts(sortBy));
    } else {
      console.log("dispatch sortComments");
      dispatch(sortComments(sortBy));
    }
  }

  handleOpenCloseModel(event) {
    const { dispatch, modals } = this.props;
    if(event.target.name === 'new-post-modal') {
      if(modals.newPost === false) {
        dispatch(newPostModal(true));
      } else {
        dispatch(newPostModal(false));
      }
    } else {
      console.log("edit post" + event.target.value);
      if(modals.editPost === false) {
        dispatch(editPostModal(true, event.target.value));
      } else {
        dispatch(editPostModal(false));
      }
    }
  }

  getComments(id) {
    const { dispatch } = this.props;
    dispatch(fetchCommentsIfNeeded(id));
  }

  render() {
    const { categories, posts, pages, comments, modals } = this.props;
    let allCats = categories.categories;
    let postList = [];
    if (!allCats) {
      allCats = [];
    }
    if (posts.posts) {
      postList = posts.posts;
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
                  sortedBy={posts.sortBy}
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
                  handleOpenCloseModel={(event) => {
                    this.handleOpenCloseModel(event);
                  }}
                />
                <Sort
                  isPost={true}
                  sortPostsOrComments={(isPost, sortBy) => {
                    this.sortPostsOrComments(isPost, sortBy);
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
                    handleSubmit={(event) => {
                      this.handleSubmit(event);
                    }}
                    handleOpenCloseModel={(event) => {
                      this.handleOpenCloseModel(event);
                    }}
                  />
                </Modal>
              </div>
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
              (
                posts.posts.find(post => post.id === pages.current_page && post.deleted === false) ? (
                  <div>
                    <ListPosts
                      posts={posts.posts.filter(post => (post.deleted === false && post.id === pages.current_page))}
                      sortedBy={posts.sortBy}
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
                    <ListComments
                      post={posts.posts.find(post => post.id === pages.current_page)}
                      comments={comments}
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
                    <Sort
                      isPost={false}
                      sortPostsOrComments={(isPost, sortBy) => {
                        this.sortPostsOrComments(isPost, sortBy);
                      }}
                    />
                    <CreateComment
                      parent={posts.posts.find(post => post.id === pages.current_page)}
                      updateWipCommentParentId={(parentId) => {
                        this.updateWipCommentParentId(parentId);
                      }}
                      handleSubmitComment={(event) => {
                        this.handleSubmitComment(event);
                      }}
                      handleInputChangeComment={(parentId) => {
                        this.handleInputChangeComment(parentId);
                      }}
                    />
                  </div>) : (
                    <Redirect to="/"/>
                  )
                )
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
                  posts={posts.posts.filter(post => (post.deleted === false && post.category === pages.current_page))}
                  sortedBy={posts.sortBy}
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
                <button name="new-post-modal" onClick={this.handleOpenCloseModel}>
                  New Post
                </button>
                <button name="edit-post-modal" onClick={this.handleOpenCloseModel}>
                  Edit Post
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
                    handleSubmit={(event) => {
                      this.handleSubmit(event);
                    }}
                    handleOpenCloseModel={(event) => {
                      this.handleOpenCloseModel(event);
                    }}
                  />
                </Modal>
                <Sort
                  isPost={true}
                  sortPostsOrComments={(isPost, sortBy) => {
                    this.sortPostsOrComments(isPost, sortBy);
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
