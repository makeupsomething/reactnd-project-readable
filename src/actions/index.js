import * as API from '../utils/api';

export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const FINISH_EDIT = 'FINISH_EDIT';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_WIP_POST = 'UPDATE_WIP_POST';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const RECEIVE_NEW_COMMENT = 'RECEIVE_NEW_COMMENT'
export const UPDATE_WIP_COMMENT = 'UPDATE_WIP_COMMENT';
export const REQUEST_UP_DOWN_VOTE_POST = 'REQUEST_UP_DOWN_VOTE_POST';
export const RECEIVE_UP_DOWN_VOTE_POST = 'RECEIVE_UP_DOWN_VOTE_POST';
export const REQUEST_UP_DOWN_VOTE_COMMENT = 'REQUEST_UP_DOWN_VOTE_COMMENT';
export const RECEIVE_UP_DOWN_VOTE_COMMENT = 'RECEIVE_UP_DOWN_VOTE_COMMENT';
export const SORT_POSTS = 'SORT_POSTS';
export const SORT_COMMENTS = 'SORT_COMMENTS';
export const NEW_POST_MODAL = 'NEW_POST_MODAL'
export const EDIT_POST_MODAL = 'EDIT_POST_MODAL'
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

function requestEditPost() {
  return {
    type: EDIT_POST,
    editing: true,
  };
}

export function editPostIfPossible(id, title, body) {
  return (dispatch, getState) => {
    return dispatch(editPost(id, title, body));
  };
}

function editPost(id, title, body) {
  return (dispatch) => {
    dispatch(requestEditPost());
    return fetch(`${api}/posts/${id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    }).then(res => res.json()).then(dispatch(fetchPostsIfNeeded()));
  };
}

export function finishEdit() {
  return {
    type: FINISH_EDIT,
    editing: false,
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

export function newPostModal(isOpen) {
  return {
    type: NEW_POST_MODAL,
    isOpen: isOpen,
  };
}

export function editPostModal(isOpen) {
  return {
    type: EDIT_POST_MODAL,
    isOpen: isOpen,
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

function fetchComment(id) {
  return (dispatch) => {
    dispatch(requestComments());
    return fetch(`${api}/comments/${id}`, { headers })
      .then(response => response.json())
      .then(json => dispatch(receiveCommentUpDownVote(json)));
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

function receiveNewComments(json) {
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
      .then(json => dispatch(receiveNewComments(json)));
  };
}

function requestEditComment() {
  return {
    type: EDIT_COMMENT,
    editing: true,
  };
}

export function editCommentIfPossible(id, timestamp, body) {
  return (dispatch, getState) => {
    return dispatch(editComment(id, timestamp, body));
  };
}

function editComment(id, timestamp, body) {
  return (dispatch) => {
    dispatch(requestEditComment());
    return fetch(`${api}/comments/${id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ timestamp, body }),
    }).then(res => res.json()).then(dispatch(fetchComment(id)));
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

function requestUpDownVoteComment() {
  return {
    type: REQUEST_UP_DOWN_VOTE_COMMENT,
  };
}

export function doUpDownVoteCommentIfPossible(vote, id, pageId) {
  return (dispatch, getState) => {
    return dispatch(doUpDownVoteComment(vote, id, pageId));
  };
}

function doUpDownVoteComment(vote, id, pageId) {
  console.log("el commento")
  console.log(pageId)
  return (dispatch) => {
    dispatch(requestUpDownVoteComment());
    return fetch(`${api}/comments/${id}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ option: vote }),
    }).then(res => res.json())
      .then(dispatch(fetchComment(id)));
  };
}

function receiveCommentUpDownVote(json) {
  return {
    type: RECEIVE_UP_DOWN_VOTE_COMMENT,
    comment: json
  };
}

function requestDeletePost() {
  return {
    type: DELETE_POST,
  };
}

function deletePost(id) {
  return (dispatch) => {
    dispatch(requestDeletePost());
    return fetch(`${api}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    }).then(res => res)
      .then(dispatch(fetchPostsIfNeeded()));
  };
}

export function deletePostIfPossible(id) {
  return (dispatch, getState) => {
    return dispatch(deletePost(id));
  };
}

function requestDeleteComment() {
  return {
    type: DELETE_COMMENT,
  };
}

function deleteComment(id) {
  return (dispatch) => {
    dispatch(requestDeleteComment());
    return fetch(`${api}/comments/${id}`, {
      method: 'DELETE',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then(json => dispatch(receiveCommentUpDownVote(json)));
  };
}

export function deleteCommentIfPossible(id) {
  return (dispatch, getState) => {
    return dispatch(deleteComment(id));
  };
}

export function sortPosts(sortBy) {
  return {
    type: SORT_POSTS,
    sortBy: sortBy,
  };
}

export function sortComments(sortBy) {
  return {
    type: SORT_COMMENTS,
    sortBy: sortBy,
  };
}
