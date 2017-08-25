import React from 'react';
import Post from './Post';
/**
* @description Component for listing the shelves
*/
export default function ListComments({ comments }) {
  let commentList = [];
  if (!comments) {
    commentList = [];
  } else {
      commentList = comments.filter(comment => comment.deleted === false);
  }
  return (
    <div className="list-books-content">
      {commentList.map(comment => (
        <div key={comment.id}>
          {comment.body}Score{comment.voteScore}
        </div>
      ))}
    </div>
  );
}
