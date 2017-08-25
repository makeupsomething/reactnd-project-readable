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
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const ADD_COMMENT = 'ADD_COMMENT';
export const RECEIVE_NEW_COMMENT = 'RECEIVE_NEW_COMMENT'
export const UPDATE_WIP_COMMENT = 'UPDATE_WIP_COMMENT';
export const REQUEST_UP_DOWN_VOTE_POST = 'REQUEST_UP_DOWN_VOTE_POST';
export const RECEIVE_UP_DOWN_VOTE_POST = 'RECEIVE_UP_DOWN_VOTE_POST';
export const REQUEST_UP_DOWN_VOTE_COMMENT = 'REQUEST_UP_DOWN_VOTE_COMMENT';
export const RECEIVE_UP_DOWN_VOTE_COMMENT = 'RECEIVE_UP_DOWN_VOTE_COMMENT';

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

export function updateCurrentPage(page) {
  return {
    type: CHANGE_PAGE,
    current_page: page,
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

function receiveComments(json, id) {
  console.log('recieve comments')
  console.log(json)
  return {
    type: RECEIVE_COMMENTS,
    id: id,
    comments: json.map(child => child),
    receivedAt: Date.now(),
  };
}

function fetchComments(id) {
  return (dispatch) => {
    dispatch(requestComments());
    return fetch(`${api}/posts/${id}/comments`, { headers })
      .then(response => response.json())
      .then(json => dispatch(receiveComments(json, id)));
  };
}

export function fetchCommentsIfNeeded(id) {
  return (dispatch, getState) => {
    return dispatch(fetchComments(id));
  };
}

function requestAddComment() {
  return {
    type: ADD_COMMENT,
  };
}

function receiveNewComment(json) {
  return {
    type: RECEIVE_NEW_COMMENT,
    new_comment: json
  };
}

export function addCommentIfPossible(id, timestamp, body, owner, parent) {
  return (dispatch, getState) => {
    return dispatch(addComment(id, timestamp, body, owner, parent));
  };
}

function addComment(id, timestamp, body, owner, parentId) {
  console.log("action add comment")
  console.log(id)
  console.log(body)
  console.log(owner)
  console.log(parentId)
  return (dispatch) => {
    dispatch(requestAddComment());
    return fetch(`${api}/comments`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, timestamp, body, owner, parentId }),
    }).then(res => res.json())
      .then(json => dispatch(receiveNewComment(json)));
  };
}

export function updateWipComment(body, owner, parentId) {
  return {
    type: UPDATE_WIP_COMMENT,
    body: body,
    owner: owner,
    parentId: parentId,
  };
}

function requestUpDownVotePost() {
  return {
    type: REQUEST_UP_DOWN_VOTE_POST,
  };
}

export function doUpDownVotePostIfPossible(vote, id) {
  return (dispatch, getState) => {
    return dispatch(doUpDownVotePost(vote, id));
  };
}

function doUpDownVotePost(vote, id) {
  return (dispatch) => {
    dispatch(requestUpDownVotePost());
    return fetch(`${api}/posts/${id}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ option: vote }),
    }).then(res => res.json())
      .then(dispatch(fetchPostsIfNeeded()));
  };
}
