import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import {
  addCommentIfPossible,
  newCommentModal,
  updateWipComment,
} from '../actions';

class CreateComment extends Component {
  constructor(props) {
    super(props);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.updateWipCommentParentId = this.updateWipCommentParentId.bind(this);
  }

  componentDidMount() {
    const { parent } = this.props;
    this.updateWipCommentParentId(parent);
  }

  updateWipCommentParentId(parentId) {
    const { dispatch, comments } = this.props;
    dispatch(updateWipComment(comments.wip_body, comments.wip_owner, parentId));
  }

  handleSubmitComment(event) {
    const { dispatch, comments } = this.props;
    const id = Math.random().toString(36).substr(-8);
    const timestamp = Date.now();
    const body = comments.wip_body;
    const owner = comments.wip_owner;
    const parentId = comments.wip_parentId;
    dispatch(addCommentIfPossible(id, timestamp, body, owner, parentId));
    event.preventDefault();
    dispatch(newCommentModal(false));
  }
  /**
  * @description The render function
  * @returns { object } The UI
  */
  render() {
    const { handleInputChangeComment, parent, handleOpenCloseAddCommentModel } = this.props;

    const style = {
      textAlign: 'left',
    };

    return (
      <div style={style}>
        <TextField
          hintText="Body"
          name="body"
          type="text"
          floatingLabelText="Body"
          floatingLabelFixed
          multiLine
          onChange={handleInputChangeComment}
        /><br />
        <br />
        <TextField
          hintText="Owner"
          name="owner"
          type="text"
          floatingLabelText="Owner"
          floatingLabelFixed
          onChange={handleInputChangeComment}
        /><br />
        <br />
        <FlatButton
          label="Cancel"
          primary
          onClick={e => handleOpenCloseAddCommentModel(e, parent)}
        />
        <FlatButton
          label="Submit"
          type="submit"
          value="Submit"
          primary
          keyboardFocused
          onClick={this.handleSubmitComment}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { comments } = state;

  return {
    comments,
  };
}

export default connect(mapStateToProps)(CreateComment);
