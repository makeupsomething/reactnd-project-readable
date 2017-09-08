import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addCommentIfPossible,
  newCommentModal,
  updateWipComment,
} from '../actions';
/**
* @description Component for listing the shelves
*/
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
    const { handleInputChangeComment } = this.props;

    return (
      <div className="list-books-content">
        <form>
          <label name="body">
            Body:
            <textarea name="body" value={undefined} onChange={handleInputChangeComment} />
          </label>
          <label name="owner">
        Owner:
            <input name="owner" type="text" value={undefined} onChange={handleInputChangeComment} />
          </label>
          <input type="submit" value="Submit Comment" onClick={this.handleSubmitComment} className="icon-btn" />
        </form>
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
