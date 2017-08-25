import React, { Component } from 'react';
/**
* @description Component for listing the shelves
*/
class DeleteButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { post, deletePostOrComment, isPost } = this.props;
    let id = post.id;
    deletePostOrComment(isPost, id)
  }
  /**
  * @description The render function
  * @returns { object } The UI
  */
  render() {
    return (
      <div className="up-down-vote-group">
      <button name="delete" onClick={this.handleClick}>
        Delete
      </button>
      </div>
    );
  }
}
export default DeleteButton;
