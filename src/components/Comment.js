import React, { Component } from 'react';
import UpDownVote from './UpDownVote';
import DeleteButton from './DeleteButton';
import EditComment from './EditComment';
import Modal from 'react-modal';
/**
* @description Component for listing the shelves
*/
class Comment extends Component {
  constructor(props) {
    super(props);
  }

  /**
  * @description The render function
  * @returns { object } The UI
  */
  render() {
    const { comment, comments, categories, modals, doUpDownVote, deletePostOrComment, updatePage, handleInputChangeComment, handleOpenCloseModel } = this.props;
    return (
      <div className="list-books-content">
        <div>
          <p>
            {comment.body}{comment.voteScore}
          </p>
          <UpDownVote
            post={comment}
            isPost={false}
            doUpDownVote={(isPost, vote, id) => {
              doUpDownVote(isPost, vote, id);
            }}
          />
          <DeleteButton
            post={comment}
            isPost={false}
            deletePostOrComment={(isPost, id) => {
              deletePostOrComment(isPost, id);
            }}
          />
          <button name="edit-comment-modal" value={comment.id} onClick={handleOpenCloseModel}>
            Edit Comment%
          </button>
          <Modal
            isOpen={modals.editComment}
            contentLabel="Modal"
          >
            <EditComment
              comment={comment}
              handleInputChangeComment={(event) => {
                handleInputChangeComment(event);
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

export default Comment;
