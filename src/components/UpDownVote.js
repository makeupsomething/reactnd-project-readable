import React, { Component } from 'react';
/**
* @description Component for listing the shelves
*/
class UpDownVote extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { post, doUpDownVote, isPost } = this.props;
    let id = post.id;
    doUpDownVote(isPost, event.target.name, id)
  }
  /**
  * @description The render function
  * @returns { object } The UI
  */
  render() {
    return (
      <div className="up-down-vote-group">
      <button name="upVote" onClick={this.handleClick}>
        Up
      </button>
      <button name="downVote" onClick={this.handleClick}>
        Down
      </button>
      </div>
    );
  }
}
export default UpDownVote;
