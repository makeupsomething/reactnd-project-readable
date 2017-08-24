import React, { Component } from 'react';
import CreateComment from './CreateComment';
import ListComments from './ListComments';
import { Link } from 'react-router-dom';
/**
* @description Component for listing the shelves
*/
class Post extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { post, getComments, comments } = this.props;
    if(comments.comments.length < 1) {
      getComments(post.id);
    }
  }
  /**
  * @description The render function
  * @returns { object } The UI
  */
  render() {
    const { post, comments, updatePage, updateWipCommentParentId, handleInputChangeComment, handleSubmitComment } = this.props;
    console.log("posts")
    console.log(post)
    let commentList = [];
    if (!comments) {
      commentList = [];
    } else {
        commentList = comments.comments.filter(comment => comment.parentId === post.id);
    }

    return (
      <div className="list-books-content">
        <div>
          <Link
            to={`/${post.category}/${post.id}`}
            className={post.id}
            value={post.id}
            onClick={() => {updatePage(post.id)}}>
            {post.title}
          </Link>
          <p>
            {post.body}{post.voteScore}NumComments{commentList.length}
          </p>
          <ListComments
            comments={commentList}
          />
          <CreateComment
            parent={post}
            handleInputChangeComment={(event) => {
              handleInputChangeComment(event);
            }}
            handleSubmitComment={(event) => {
              handleSubmitComment(event);
            }}
            updateWipCommentParentId={(parentId) => {
              updateWipCommentParentId(parentId);
            }}
          />
        </div>
      </div>
    );
  }
}

export default Post;
