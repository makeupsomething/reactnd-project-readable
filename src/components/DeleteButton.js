import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import {
  deletePostIfPossible,
  updateCurrentPage,
  deleteCommentIfPossible,
} from '../actions';
/**
* @description Component for listing the shelves
*/
class DeleteButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.deletePostOrComment = this.deletePostOrComment.bind(this);
  }

  handleClick() {
    const { post, isPost } = this.props;
    let id = post.id;
    this.deletePostOrComment(isPost, id);
  }

  deletePostOrComment(isPost, id) {
    const { dispatch, pages, categories } = this.props;
    if (isPost) {
      dispatch(deletePostIfPossible(id));
      if (pages.current_page !== 'home' && !categories.categories.find(cat => cat === pages.current_page)) {
        dispatch(updateCurrentPage('home'));
      }
    } else {
      dispatch(deleteCommentIfPossible(id));
    }
  }
  /**
  * @description The render function
  * @returns { object } The UI
  */
  render() {

    const style = {
      margin: 5,
    };

    return (
        <RaisedButton style={style} label="Delete" name="delete" onClick={this.handleClick} />
    );
  }
}

function mapStateToProps(state) {
  const { pages, categories } = state;

  return {
    pages,
    categories,
  };
}

export default connect(mapStateToProps)(DeleteButton);
