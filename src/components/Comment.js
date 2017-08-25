import React, { Component } from 'react';
import CreateComment from './CreateComment';
import UpDownVote from './UpDownVote';
import DeleteButton from './DeleteButton';
import { Link } from 'react-router-dom';
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
    const { comment, doUpDownVote, deletePostOrComment } = this.props;
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
        </div>
      </div>
    );
  }
}

export default Comment;
