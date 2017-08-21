const api = 'http://localhost:5001';


let token = localStorage.token;

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  'Authorization': token,
};

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    //.then(data => data.posts);

export const addPost = (id, timestamp, title, body, owner, category) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, timestamp, title, body, owner, category }),
  }).then(res => res.json());
