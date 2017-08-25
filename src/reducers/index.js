import { combineReducers } from 'redux';

import {
  ADD_POST,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  UPDATE_WIP_POST,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  CHANGE_PAGE,
  ADD_COMMENT,
  RECEIVE_NEW_COMMENT,
  RECEIVE_COMMENTS,
  UPDATE_WIP_COMMENT,
  RECEIVE_UP_DOWN_VOTE_COMMENT,
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

function posts(state = { }, action) {
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

function comments(state = {comments:[] }, action) {
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
    default :
      return state;
  }
}

const rootReducer = combineReducers({
  categories,
  posts,
  pages,
  comments,
});

export default rootReducer;
