import * as API from '../utils/api';

export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const REQUEST_CATEGORIES = 'REQUEST_POSTS'
export const RECEIVE_CATEGORIES = 'RECEIVE_POSTS'

const api = 'http://localhost:5001';


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  'Authorization': token,
};

export function addPost({ id, timestamp, title, body, owner, category }) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    owner,
    category,
  };
}

function requestCategories() {
  return {
    type: REQUEST_CATEGORIES,
  }
}

function receiveCategories(json) {
  return {
    type: RECEIVE_CATEGORIES,
    categories: json.categories.map(child => child.name),
    receivedAt: Date.now()
  }
}

function fetchCategories() {
  return dispatch => {
    dispatch(requestCategories())
    return fetch(`${api}/categories`, { headers })
      .then(response => response.json())
      .then(json => dispatch(receiveCategories(json)))
  }
}

export function fetchCategoriesIfNeeded() {
  return (dispatch, getState) => {
    return dispatch(fetchCategories())
  }
}
