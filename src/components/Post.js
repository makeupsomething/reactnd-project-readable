import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import UpDownVote from './UpDownVote';
import DeleteButton from './DeleteButton';
import EditPost from './EditPost';

import {
  fetchCommentsIfNeeded,
} from '../actions';

/**
* @description Component for listing the shelves
*/
class Post extends Component {
  constructor(props) {
    super(props);
    this.getComments = this.getComments.bind(this);
  }

  componentDidMount() {
    const { post, getComments, comments } = this.props;
    if (comments.comments.length < 1) {
      this.getComments(post.id);
    }
  }

  getComments(id) {
    const { dispatch } = this.props;
    dispatch(fetchCommentsIfNeeded(id));
  }
  /**
  * @description The render function
  * @returns { object } The UI
  */
  render() {
    const {
      post,
      modals,
      comments,
      updatePage,
      handleOpenCloseModel,
      handleInputChange,
    } = this.props;

    let numComments = 0
    if (comments.comments) {
      numComments = comments.comments.filter(comment => (!comment.deleted && comment.parentId === post.id))
    }

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
            {post.body}{post.voteScore}NumComments{numComments.length}
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

function mapStateToProps(state) {
  const { comments, modals } = state;

  return {
    comments,
    modals,
  };
}

export default connect(mapStateToProps)(Post);
