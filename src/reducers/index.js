import { combineReducers } from 'redux';

import {
  ADD_POST,
  EDIT_POST,
  FINISH_EDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  UPDATE_WIP_POST,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  CHANGE_PAGE,
  ADD_COMMENT,
  EDIT_COMMENT,
  RECEIVE_NEW_COMMENT,
  RECEIVE_COMMENTS,
  UPDATE_WIP_COMMENT,
  RECEIVE_UP_DOWN_VOTE_COMMENT,
  SORT_POSTS,
  SORT_COMMENTS,
  NEW_POST_MODAL,
  EDIT_POST_MODAL,
  NEW_COMMENT_MODAL,
  EDIT_COMMENT_MODAL,
} from '../actions';

function categories(state = { }, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES :
      return Object.assign({}, state, {
        categories: action.categories,
        lastUpdated: action.receivedAt,
      });
    default :
      return state;
  }
}

function posts(state = {editing: false, sortBy: 'date'}, action) {
  switch (action.type) {
    case ADD_POST :
      console.log(action);
      return state;
    case RECEIVE_POSTS :
      return Object.assign({}, state, {
        posts: action.posts,
        lastUpdated: action.receivedAt,
      });
    case UPDATE_WIP_POST :
      return Object.assign({}, state, {
        wip_title: action.title,
        wip_body: action.body,
        wip_category: action.category,
        wip_owner: action.owner,
      });
    case EDIT_POST :
      return Object.assign({}, state, {
        editing: action.editing,
      });
    case FINISH_EDIT :
      return Object.assign({}, state, {
        editing: action.editing,
      });
    case SORT_POSTS :
      return Object.assign({}, state, {
        sortBy: action.sortBy,
      });
    default :
      return state;
  }
}

function pages(state = { }, action) {
  switch (action.type) {
    case CHANGE_PAGE :
      return Object.assign({}, state, {
        current_page: action.current_page,
      });
    default :
      return state;
  }
}

function modals(state = { newPost: false, editPost: false, newComment: false, editComment: false}, action) {
  switch (action.type) {
    case NEW_POST_MODAL :
      return Object.assign({}, state, {
        newPost: action.isOpen,
      });
    case EDIT_POST_MODAL :
      return Object.assign({}, state, {
        editPost: action.isOpen,
        postId: action.id,
      });
      case NEW_COMMENT_MODAL :
        return Object.assign({}, state, {
          newComment: action.isOpen,
          parentId: action.parentId,
        });
      case EDIT_COMMENT_MODAL :
        return Object.assign({}, state, {
          editComment: action.isOpen,
          commentId: action.id,
        });
    default :
      return state;
  }
}

function comments(state = {comments:[], editing: false, sortBy: 'date' }, action) {
  switch (action.type) {
    case ADD_COMMENT :
      return state;
    case RECEIVE_COMMENTS :
      return Object.assign({}, state, {
        comments: state.comments.concat(action.comments),
      });
    case UPDATE_WIP_COMMENT :
      return Object.assign({}, state, {
        wip_body: action.body,
        wip_owner: action.owner,
        wip_parentId: action.parentId,
      });
    case RECEIVE_NEW_COMMENT :
      return Object.assign({}, state, {
        comments: state.comments.concat(action.new_comment),
      });
    case RECEIVE_UP_DOWN_VOTE_COMMENT :
      return Object.assign({}, state, {
        comments: state.comments.map(comment => { return comment.id == action.comment.id ? action.comment : comment }),
      });
    case EDIT_COMMENT :
      return Object.assign({}, state, {
        editing: action.editing,
      });
    case FINISH_EDIT :
      return Object.assign({}, state, {
        editing: action.editing,
      });
    case SORT_COMMENTS :
      return Object.assign({}, state, {
        sortBy: action.sortBy,
      });
    default :
      return state;
  }
}

const rootReducer = combineReducers({
  categories,
  posts,
  pages,
  modals,
  comments,
});

export default rootReducer;
