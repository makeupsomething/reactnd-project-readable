import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  editCommentIfPossible,
  editCommentModal,
} from '../actions';
/**
* @description Component for listing the shelves
*/
class EditComment extends Component {
  constructor(props) {
    super(props);
    this.handleSubmitEditComment = this.handleSubmitEditComment.bind(this);
    this.cancelEditComment = this.cancelEditComment.bind(this);
  }

  componentDidMount() {
    const { comment, modals, loadEditComment } = this.props;
    if(modals.commentId === comment.id) {
      loadEditComment(comment)
    }
  }

  handleSubmitEditComment(event) {
    console.log("##########")
    const { dispatch, comments } = this.props;
    console.log(comments)
    const id = comments.wip_parentId;
    const timestamp = Date.now();
    const body = comments.wip_body;
    dispatch(editCommentIfPossible(id, timestamp, body));
    event.preventDefault();
    dispatch(editCommentModal(false));
  }

  cancelEditComment() {
    const { dispatch, comments } = this.props;
    dispatch(editCommentModal(false));
  }
  /**
  * @description The render function
  * @returns { object } The UI
  */
  render() {
    const { comments, comment, handleInputChangeComment } = this.props;

    return (
      <div className="list-books-content">
        <form>
          <label name="body">
            Body:
            <textarea name="body" value={comments.wip_body} onChange={handleInputChangeComment} />
          </label>
          <label name="owner">
        Owner:
            <input name="owner" type="text" value={comments.wip_owner} onChange={handleInputChangeComment} />
          </label>
          <input type="submit" value="Submit Comment" onClick={this.handleSubmitEditComment} className="icon-btn" />
        </form>
        <button name="cancel" onClick={this.cancelEditComment}>
          Cancel%
        </button>
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

export default connect(mapStateToProps)(EditComment);
