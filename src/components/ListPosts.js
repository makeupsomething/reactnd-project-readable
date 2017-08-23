import React from 'react';

/**
* @description Component for listing the shelves
*/
export default function ListPosts({ posts, pages }) {

  let postList = []
  if(!pages.current_page) {
    postList = posts.posts//.filter(post => post.category === pages.current_page);
  } else {
    if(pages.current_page !== "home") {
      postList = posts.posts.filter(post => post.category === pages.current_page);
    } else {
      postList = posts.posts;
    }
  }

  if(!postList) {
    postList = [];
  }

  return (
    <div className="list-books-content">
      {postList.map(post => (
        <p key={post.id}>
          {post.title}{post.body}{post.voteScore}
        </p>
      ))}
    </div>
  );
}
