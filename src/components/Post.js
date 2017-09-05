import React, { Component } from 'react';
import CreateComment from './CreateComment';
import UpDownVote from './UpDownVote';
import DeleteButton from './DeleteButton';
import Modal from 'react-modal'
import EditPost from './EditPost';
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
    const { post, posts, modals, comments, updatePage, doUpDownVote, deletePostOrComment, handleOpenCloseModel, handleInputChange } = this.props;

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
          <button name="edit-post-modal" value={post.id} onClick={handleOpenCloseModel}>
            Edit Post%
          </button>
          <Modal
            isOpen={modals.editPost}
            contentLabel="Modal"
          >
            <EditPost
              posts={posts}
              post={post}
              modals={modals}
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
