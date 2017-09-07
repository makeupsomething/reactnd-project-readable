import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addPostIfPossible,
  newPostModal,
} from '../actions';
/**
* @description Component for listing the shelves
*/
class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { dispatch, posts } = this.props;
    const id = Math.random().toString(36).substr(-8);
    const timestamp = Date.now();
    const title = posts.wip_title;
    const body = posts.wip_body;
    const owner = posts.wip_owner;
    const category = posts.wip_category;
    dispatch(addPostIfPossible(id, timestamp, title, body, owner, category));
    event.preventDefault();
    dispatch(newPostModal(false));
  }
  /**
  * @description The render function
  * @returns { object } The UI
  */
  render() {
    const { post, categories, handleInputChange, handleOpenCloseModel } = this.props;
    let allCats = categories.categories;

    if (!allCats) {
      allCats = [];
    }

    return (
      <div className="list-books-content">
        <form>
          <label name="title">
            Title:
            <input name="title" type="text" value={undefined} onChange={handleInputChange} />
          </label>
          <label name="body">
            Body:
            <textarea name="body" value={undefined} onChange={handleInputChange} />
          </label>
          <label>
        Category:
            <select name="category" value={undefined} onChange={handleInputChange}>
              {allCats.map(item => (<option key={item} value={item}>{item}</option>))}
            </select>
          </label>
          <label name="title">
        Owner:
            <input name="owner" type="text" value={undefined} onChange={handleInputChange} />
          </label>
          <input type="submit" value="Submit" onClick={this.handleSubmit} className="icon-btn" />
        </form>
        <button name="new-post-modal" onClick={handleOpenCloseModel}>
          Cancel
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { posts } = state;

  return {
    posts,
  };
}

export default connect(mapStateToProps)(CreatePost);
