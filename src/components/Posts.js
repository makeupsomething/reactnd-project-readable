import React from 'react';

/**
* @description Component for listing the shelves
*/
export default function Posts({ categories, posts, handleInputChange, handleSubmit }) {

  let allCats = categories.categories;
  let postList = posts.posts;

  if (!allCats) {
    allCats = [];
  }
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
        <form>
          <label name="title">
            Title:
            <input name="title" type="text" value={undefined} onChange={handleInputChange} />
          </label>
          <label name="body">
            Body:
            <textarea name="body" value={undefined} onChange={handleInputChange} />
          </label>
          <label>
        Category:
            <select name="category" value={undefined} onChange={handleInputChange}>
              {allCats.map(item => (<option key={item} value={item}>{item}</option>))}
            </select>
          </label>
          <label name="title">
        Owner:
            <input name="owner" type="text" value={undefined} onChange={handleInputChange} />
          </label>
          <input type="submit" value="Submit" onClick={handleSubmit} className="icon-btn" />
        </form>
      </div>
    </div>
  );
}
