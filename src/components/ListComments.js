import React from 'react';
import Post from './Post';
/**
* @description Component for listing the shelves
*/
export default function ListComments({ comments }) {
  return (
    <div className="list-books-content">
      {comments.map(comment => (
        <div key={comment.id}>
          {comment.body}
        </div>
      ))}
    </div>
  );
}
