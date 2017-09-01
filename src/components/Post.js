import React, { Component } from 'react';
import CreateComment from './CreateComment';
import UpDownVote from './UpDownVote';
import DeleteButton from './DeleteButton';
import { Link, Redirect } from 'react-router-dom';
/**
* @description Component for listing the shelves
*/
class Post extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { post, getComments, comments } = this.props;
    if(comments.length < 1) {
      getComments(post.id);
    }
  }
  /**
  * @description The render function
  * @returns { object } The UI
  */
  render() {
    const { post, modals, comments, updatePage, updateWipCommentParentId, handleInputChangeComment, handleSubmitComment, doUpDownVote, deletePostOrComment } = this.props;

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
            {post.body}{post.voteScore}NumComments{comments.length}
          </p>
          <UpDownVote
            post={post}
            isPost={true}
            doUpDownVote={(isPost, vote, id) => {
              doUpDownVote(isPost, vote, id);
            }}
          />
          <DeleteButton
            post={post}
            isPost={true}
            deletePostOrComment={(isPost, id) => {
              deletePostOrComment(isPost, id);
            }}
          />
        </div>
      </div>
    );
  }
}

export default Post;
