import React from 'react';

/**
* @description Component for listing the shelves
*/
export default function Post({ posts, getComments }) {

  let postList = posts.posts;

  if(!postList) {
    postList = [];
  }

  return (
    <div className="list-books-content">
      <div>
        {postList.map(post => (
          <p key={post.id}>
            {post.title}{post.body}{post.voteScore}
          </p>
        ))}
        <button onClick={getComments('8xf0y6ziyjabvozdd253nd')}>
          get comments
        </button>
      </div>
    </div>
  );
}
