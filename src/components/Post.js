import React, { Component } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

import UpDownVote from './UpDownVote';
import DeleteButton from './DeleteButton';
import EditPost from './EditPost';
/**
* @description Component for listing the shelves
*/
class Post extends Component {
  componentDidMount() {
    const { post, getComments, comments } = this.props;
    if (comments.length < 1) {
      getComments(post.id);
    }
  }
  /**
  * @description The render function
  * @returns { object } The UI
  */
  render() {
    const {
      post,
      posts,
      modals,
      comments,
      updatePage,
      handleOpenCloseModel,
      handleInputChange,
    } = this.props;

    return (
      <div className="list-books-content">
        <div>
          <Link
            to={`/${post.category}/${post.id}`}
            className={post.id}
            value={post.id}
            onClick={() => { updatePage(post.id); }}
          >
            {post.title}
          </Link>
          <p>
            {post.body}{post.voteScore}NumComments{comments.length}
          </p>
          <UpDownVote
            post={post}
            isPost
          />
          <DeleteButton
            post={post}
            isPost
          />
          <button name="edit-post-modal" value={post.id} onClick={handleOpenCloseModel}>
            Edit Post%
          </button>
          <Modal
            isOpen={modals.editPost}
            contentLabel="Modal"
          >
            <EditPost
              post={post}
              handleInputChange={(event) => {
                handleInputChange(event);
              }}
              updatePage={(page) => {
                updatePage(page);
              }}
            />
          </Modal>
        </div>
      </div>
    );
  }
}

export default Post;
