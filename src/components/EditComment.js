import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {
  editCommentIfPossible,
  editCommentModal,
} from '../actions';

class EditComment extends Component {
  constructor(props) {
    super(props);
    this.handleSubmitEditComment = this.handleSubmitEditComment.bind(this);
    this.cancelEditComment = this.cancelEditComment.bind(this);
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
    const { dispatch } = this.props;
    dispatch(editCommentModal(false));
  }
  /**
  * @description The render function
  * @returns { object } The UI
  */
  render() {
    const { comments, handleInputChangeComment } = this.props;

    const style = {
      textAlign: 'left',
    };

    return (
      <div className="list-books-content" style={style}>
        <TextField
          hintText="Body"
          name="body"
          type="text"
          floatingLabelText="Body"
          floatingLabelFixed
          multiLine
          value={comments.wip_body}
          onChange={handleInputChangeComment}
        /><br />
        <br />
        <TextField
          name="owner"
          type="text"
          floatingLabelText="Owner"
          floatingLabelFixed
          value={comments.wip_owner}
          disabled
        /><br />
        <br />
        <FlatButton
          label="Cancel"
          primary
          onClick={this.cancelEditComment}
        />
        <FlatButton
          label="Submit"
          type="submit"
          value="Submit"
          primary
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
