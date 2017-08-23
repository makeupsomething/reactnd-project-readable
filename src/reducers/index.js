import { combineReducers } from 'redux';

import {
  ADD_POST,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  UPDATE_WIP_POST,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  CHANGE_PAGE,
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
      return state;
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
      return state;
    default :
      return state;
  }
}

const rootReducer = combineReducers({
  categories,
  posts,
  pages,
});

export default rootReducer;
