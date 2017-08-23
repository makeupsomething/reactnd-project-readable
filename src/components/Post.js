import React, { Component } from 'react';

/**
* @description Component for listing the shelves
*/
class Post extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, post, getComments } = this.props;
    getComments(post.id);
  }
  /**
  * @description The render function
  * @returns { object } The UI
  */
  render() {
    const { post, comments } = this.props;
    let commentList = [];
    if (!comments) {
      commentList = [];
    } else {
        commentList = comments.comments.filter(comment => comment.parentId === post.id);
    }
    console.log("comment list");
    console.log(commentList)

    return (
      <div className="list-books-content">
        <div>
            <p>
              {post.title}{post.body}{post.voteScore}NumComments{commentList.length}
            </p>
        </div>
      </div>
    );
  }
}

export default Post;
