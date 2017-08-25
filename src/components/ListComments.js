import React from 'react';
import Comment from './Comment';
/**
* @description Component for listing the shelves
*/
export default function ListComments({ comments, doUpDownVote }) {
  let commentList = [];
  if (!comments) {
    commentList = [];
  } else {
      commentList = comments.filter(comment => comment.deleted === false);
  }
  return (
    <div className="list-books-content">
      {commentList.map(comment => (
        <Comment
          comment={comment}
          doUpDownVote={(isPost, vote, id) => {
            doUpDownVote(isPost, vote, id);
          }}
        />
      ))}
    </div>
  );
}
