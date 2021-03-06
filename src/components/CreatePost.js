import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import {
  addPostIfPossible,
  newPostModal,
  updateWipPost,
} from '../actions';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChangeCategory = this.handleInputChangeCategory.bind(this);
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

  handleInputChangeCategory(event, index, value) {
    const { dispatch, posts } = this.props;
    let title = '';
    let body = '';
    let category = '';
    let owner = '';

    body = posts.wip_body;
    title = posts.wip_title;
    category = value;
    owner = posts.wip_owner;
    dispatch(updateWipPost(title, body, category, owner));
  }
  /**
  * @description The render function
  * @returns { object } The UI
  */
  render() {
    const { posts, categories, handleInputChange, openCloseNewPostModel } = this.props;
    let allCats = categories.categories;

    if (!allCats) {
      allCats = [];
    }

    const style = {
      textAlign: 'left',
    };

    return (
      <div style={style}>
        <TextField
          hintText="Title"
          name="title"
          type="text"
          floatingLabelText="Title"
          floatingLabelFixed
          onChange={handleInputChange}
        /><br />
        <br />
        <TextField
          hintText="Body"
          name="body"
          type="text"
          floatingLabelText="Body"
          floatingLabelFixed
          multiLine
          onChange={handleInputChange}
        /><br />
        <br />
        <TextField
          hintText="Owner"
          name="owner"
          type="text"
          floatingLabelText="Owner"
          floatingLabelFixed
          onChange={handleInputChange}
        /><br />
        <br />
        <DropDownMenu name="category" value={posts.wip_category ? posts.wip_category : 'none'} onChange={this.handleInputChangeCategory}>
          <MenuItem value="none" disabled primaryText="Select Category" />
          {allCats.map(item => (<MenuItem key={item} value={item} primaryText={item} />))}
        </DropDownMenu><br />
        <br />
        <FlatButton
          label="Cancel"
          primary
          onClick={openCloseNewPostModel}
        />
        <FlatButton
          label="Submit"
          type="submit"
          value="Submit"
          primary
          keyboardFocused
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
