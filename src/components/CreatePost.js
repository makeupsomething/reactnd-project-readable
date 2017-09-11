import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addPostIfPossible,
  newPostModal,
} from '../actions';

import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
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
    const { post, posts, categories, handleInputChange, openCloseNewPostModel } = this.props;
    let allCats = categories.categories;

    if (!allCats) {
      allCats = [];
    }

    return (
      <div>
      <TextField
        hintText="Title"
        name="title"
        type="text"
        onChange={handleInputChange}
      /><br />
      <br />
      <TextField
        hintText="Body"
        name="body"
        type="text"
        multiLine={true}
        onChange={handleInputChange}
      /><br />
      <br />
      <TextField
        hintText="Owner"
        name="owner"
        type="text"
        onChange={handleInputChange}
      /><br />
      <br />
      <DropDownMenu name="category" value={posts.wip_category ? posts.wip_category : 'none'} onChange={handleInputChange}>
        <MenuItem value="none" disabled={true} primaryText="Select Category" />
        {allCats.map(item => (<MenuItem key={item} value={item} primaryText={item} />))}
      </DropDownMenu><br />
      <br />
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={openCloseNewPostModel}
      />
      <FlatButton
        label="Submit"
        type="submit"
        value="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit}
      />
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
