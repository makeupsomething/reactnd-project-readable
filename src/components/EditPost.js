import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  editPostIfPossible,
  updateCurrentPage,
  editPostModal,
} from '../actions';
/**
* @description Component for listing the shelves
*/
class EditPost extends Component {
  constructor(props) {
    super(props);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
  }

  componentDidMount() {
    const { loadEditPost, post, modals } = this.props;
    if(modals.postId === post.id) {
      loadEditPost(post)
    }
  }

  handleSubmitEdit(event) {
    const { dispatch, posts, pages, modals } = this.props;
    const id = modals.postId;
    const title = posts.wip_title;
    const body = posts.wip_body;
    console.log("editing post")
    console.log(id)
    console.log(title)
    console.log(body)
    dispatch(editPostIfPossible(id, title, body));
    event.preventDefault();
    //dispatch(updateCurrentPage('home'));
    dispatch(editPostModal(false))
  }
  /**
  * @description The render function
  * @returns { object } The UI
  */
  render() {
    const { posts, post, handleInputChange, loadEditPost } = this.props;
    console.log(posts)
    return (
      <div className="list-books-content">
        <form>
          <label name="title">
            Title:
            <input name="title" type="text" value={posts.wip_title} onChange={handleInputChange} />
          </label>
          <label name="body">
            Body:
            <textarea name="body" value={posts.wip_body} onChange={handleInputChange} />
          </label>
          <label>
            Owner:
            <input name="owner" type="text" value={undefined} onChange={handleInputChange} />
          </label>
          <input type="submit" value="Submit" onClick={this.handleSubmitEdit} className="icon-btn" />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { posts, pages, comments, modals } = state;

  return {
    posts,
    pages,
    comments,
    modals,
  };
}

export default connect(mapStateToProps)(EditPost);
