import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  editPostIfPossible,
  updateCurrentPage,
  editPostModal,
  updateWipPost,
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
    const { post, modals } = this.props;
    if(modals.postId === post.id) {
      this.loadEditPost(post)
    }
  }

  loadEditPost(post) {
    const { dispatch } = this.props;
    let body = post.body;
    let title = post.title;
    let category = post.category;
    let owner = post.author;
    dispatch(updateWipPost(title, body, category, owner));
  }

  handleSubmitEdit(event) {
    const { dispatch, posts, modals } = this.props;
    const id = modals.postId;
    const title = posts.wip_title;
    const body = posts.wip_body;
    dispatch(editPostIfPossible(id, title, body));
    event.preventDefault();
    dispatch(editPostModal(false))
  }
  /**
  * @description The render function
  * @returns { object } The UI
  */
  render() {
    const { posts, post, handleInputChange } = this.props;
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
