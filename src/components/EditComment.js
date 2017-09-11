import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  editCommentIfPossible,
  editCommentModal,
  updateWipComment,
} from '../actions';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
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
    const { comment, modals } = this.props;
    if (modals.commentId === comment.id) {
      this.loadEditComment(comment);
    }
  }

  loadEditComment(comment) {
    const { dispatch } = this.props;
    dispatch(updateWipComment(comment.body, comment.author, comment.id));
  }

  handleSubmitEditComment(event) {
    const { dispatch, comments } = this.props;
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
    const { comments, handleInputChangeComment } = this.props;

    return (
      <div className="list-books-content">
        <TextField
          hintText="Body"
          name="body"
          type="text"
          floatingLabelText="Body"
          floatingLabelFixed={true}
          multiLine={true}
          value={comments.wip_body}
          onChange={handleInputChangeComment}
        /><br />
        <br />
        <TextField
          hintText="Owner"
          name="owner"
          type="text"
          floatingLabelText="Owner"
          floatingLabelFixed={true}
          value={comments.wip_owner}
          disabled={true}
        /><br />
        <br />
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.cancelEditComment}
        />
        <FlatButton
          label="Submit"
          type="submit"
          value="Submit"
          primary={true}
          keyboardFocused={true}
          onClick={this.handleSubmitEditComment}
        />
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
