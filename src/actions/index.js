export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const SHOW_CATEGORIES = 'SHOW_CATEGORIES';

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

export function showCategories({categories}) {
  return {
    type: SHOW_CATEGORIES,
    categories,
  };
}
