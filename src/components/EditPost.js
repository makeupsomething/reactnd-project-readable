import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  editPostIfPossible,
  updateCurrentPage,
  editPostModal,
  updateWipPost,
} from '../actions';

import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
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
    const owner = post.author;
    dispatch(updateWipPost(title, body, category, owner));
  }

  handleSubmitEdit(event) {
    const { dispatch, posts, modals } = this.props;
    const id = modals.postId;
    const title = posts.wip_title;
    const body = posts.wip_body;
    dispatch(editPostIfPossible(id, title, body));
    event.preventDefault();
    dispatch(editPostModal(false));
  }
  /**
  * @description The render function
  * @returns { object } The UI
  */
  render() {
    const { posts, categories, handleInputChange, handleOpenCloseEditPostModel } = this.props;
    let allCats = categories.categories;

    if (!allCats) {
      allCats = [];
    }

    const style = {
      textAlign: 'left',
    };

    return (
      <div className="edit-post-dialog" style={style}>
        <TextField
          hintText="Title"
          name="title"
          type="text"
          floatingLabelText="Title"
          floatingLabelFixed={true}
          value={posts.wip_title}
          onChange={handleInputChange}
        /><br />
        <br />
        <TextField
          hintText="Body"
          name="body"
          type="text"
          floatingLabelText="Body"
          floatingLabelFixed={true}
          value={posts.wip_body}
          multiLine={true}
          onChange={handleInputChange}
        /><br />
        <br />
        <TextField
          hintText="Owner"
          name="owner"
          type="text"
          floatingLabelText="Owner"
          floatingLabelFixed={true}
          value={posts.wip_owner}
          disabled={true}
          onChange={handleInputChange}
        /><br />
        <br />
        <DropDownMenu name="category" value={posts.wip_category ? posts.wip_category : 'none'} disabled={true} onChange={handleInputChange}>
          <MenuItem value="none" disabled={true} primaryText="Select Category" />
          {allCats.map(item => (<MenuItem key={item} value={item} primaryText={item} />))}
        </DropDownMenu><br />
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={handleOpenCloseEditPostModel}
        />
        <FlatButton
          label="Submit"
          type="submit"
          value="Submit"
          primary={true}
          keyboardFocused={true}
          onClick={this.handleSubmitEdit}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { posts, pages, comments, modals, categories } = state;

  return {
    posts,
    pages,
    comments,
    modals,
    categories,
  };
}

export default connect(mapStateToProps)(EditPost);
