import { combineReducers } from 'redux';

import {
  ADD_POST,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
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
    default :
      return state;
  }
}

const rootReducer = combineReducers({
  categories,
  posts,
});

export default rootReducer;
