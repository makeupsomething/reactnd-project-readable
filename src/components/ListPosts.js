import React from 'react';
import Post from './Post';
/**
* @description Component for listing the shelves
*/
export default function ListPosts({ posts, pages, getComments, comments, updatePage, updateWipCommentParentId, handleInputChangeComment, handleSubmitComment, doUpDownVote }) {

  let postList = [];
  if (!pages.current_page) {
    postList = posts.posts;
  } else {
    if (pages.current_page !== 'home') {
      postList = posts.posts.filter(post => post.category === pages.current_page);
    } else {
      postList = posts.posts;
    }
  }

  if (!postList) {
    postList = [];
  }

  return (
    <div className="list-books-content">
      {postList.map(post => (
        <div key={post.id}>
          <Post
            post={post}
            getComments={(id) => {
              getComments(id);
            }}
            comments={comments}
            updatePage={(page) => {
              updatePage(page);
            }}
            updateWipCommentParentId={(parentId) => {
              updateWipCommentParentId(parentId);
            }}
            handleSubmitComment={(event) => {
              handleSubmitComment(event);
            }}
            handleInputChangeComment={(parentId) => {
              handleInputChangeComment(parentId);
            }}
            doUpDownVote={(isPost, vote, id) => {
              doUpDownVote(isPost, vote, id);
            }}
          />
        </div>
      ))}
    </div>
  );
}
