import * as API from '../utils/api';

export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const UPDATE_WIP_POST = 'UPDATE_WIP_POST';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

const api = 'http://localhost:5001';


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;

if (!token) {
  token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
  'Authorization': token,
};

function requestAddPost() {
  return {
    type: ADD_POST,
  };
}

export function addPostIfPossible(id, timestamp, title, body, owner, category) {
  return (dispatch, getState) => {
    return dispatch(addPost(id, timestamp, title, body, owner, category));
  };
}

function addPost(id, timestamp, title, body, owner, category) {
  return (dispatch) => {
    dispatch(requestAddPost());
    return fetch(`${api}/posts`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, timestamp, title, body, owner, category }),
    }).then(res => res.json()).then(dispatch(fetchPostsIfNeeded()));
  };
}

export function updateWipPost(title, body, category, owner) {
  return {
    type: UPDATE_WIP_POST,
    title: title,
    body: body,
    category: category,
    owner: owner,
  };
}

function requestCategories() {
  return {
    type: REQUEST_CATEGORIES,
  };
}

function receiveCategories(json) {
  return {
    type: RECEIVE_CATEGORIES,
    categories: json.categories.map(child => child.name),
    receivedAt: Date.now(),
  };
}

function fetchCategories() {
  return (dispatch) => {
    dispatch(requestCategories());
    return fetch(`${api}/categories`, { headers })
      .then(response => response.json())
      .then(json => dispatch(receiveCategories(json)));
  };
}

export function fetchCategoriesIfNeeded() {
  return (dispatch, getState) => {
    return dispatch(fetchCategories());
  };
}

function requestPosts() {
  return {
    type: REQUEST_POSTS,
  };
}

function receivePosts(json) {
  return {
    type: RECEIVE_POSTS,
    posts: json.map(child => child),
    receivedAt: Date.now(),
  };
}

function fetchPosts() {
  return (dispatch) => {
    dispatch(requestPosts());
    return fetch(`${api}/posts`, { headers })
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)));
  };
}

export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    return dispatch(fetchPosts());
  };
}

function requestComments() {
  return {
    type: REQUEST_COMMENTS,
  };
}

function receiveComments(json) {
  console.log('recieve comments')
  console.log(json)
  return {
    type: RECEIVE_COMMENTS,
    comments: json.map(child => child),
    receivedAt: Date.now(),
  };
}

function fetchComments(id) {
  return (dispatch) => {
    dispatch(requestComments());
    return fetch(`${api}/posts/${id}/comments`, { headers })
      .then(response => response.json())
      .then(json => dispatch(receiveComments(json)));
  };
}

export function fetchCommentsIfNeeded(id) {
  return (dispatch, getState) => {
    return dispatch(fetchComments(id));
  };
}
