import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import UpDownVote from './UpDownVote';
import DeleteButton from './DeleteButton';
import EditPost from './EditPost';
import ListComments from './ListComments';

import {
  fetchCommentsIfNeeded,
  editPostModal
} from '../actions';

/**
* @description Component for listing the shelves
*/
class Post extends Component {
  constructor(props) {
    super(props);
    this.getComments = this.getComments.bind(this);
    this.handleOpenCloseEditPostModel = this.handleOpenCloseEditPostModel.bind(this);
  }

  componentDidMount() {
    const { post, getComments, comments } = this.props;
    if (comments.comments.length < 1) {
      this.getComments(post.id);
    }
  }

  getComments(id) {
    const { dispatch } = this.props;
    dispatch(fetchCommentsIfNeeded(id));
  }

  handleOpenCloseEditPostModel(event, postId) {
    const { dispatch, modals } = this.props;
    console.log(postId)
    if (modals.editPost === false) {
      dispatch(editPostModal(true, postId));
    } else {
      dispatch(editPostModal(false));
    }
  }
  /**
  * @description The render function
  * @returns { object } The UI
  */
  render() {
    const {
      post,
      modals,
      comments,
      updatePage,
      handleOpenCloseModel,
      handleInputChange,
      handleInputChangeComment,
    } = this.props;

    const style = {
      margin: 5,
    };

    let numComments = 0;
    if (comments.comments) {
      numComments = comments.comments.filter(comment => (!comment.deleted && comment.parentId === post.id));
    }

    return (
      <div className="list-books-content">
        <div>
          <Card>
            <CardHeader
              title={post.title}
            />
            <Link
              to={`/${post.category}/${post.id}`}
              className={post.id}
              value={post.id}
              onClick={() => { updatePage(post.id); }}
            />
            <CardText>
              {post.body}
            </CardText>
            <Badge
              badgeContent={post.voteScore}
              primary={true}
            >
              <NotificationsIcon />
            </Badge>
            <CardActions>
              <UpDownVote
                post={post}
                isPost
                label="Up Vote"
                name="upVote"
              />
              <UpDownVote
                post={post}
                isPost
                label="Down Vote"
                name="downVote"
              />
              <RaisedButton style={style} label={`View Comments(${numComments.length})`} />
              <RaisedButton style={style} label="Edit Post" name="edit-post-modal" value={post.id} onClick={(e) => this.handleOpenCloseEditPostModel(e, post.id)} />
              <DeleteButton
                post={post}
                isPost
              />
              <RaisedButton style={style} label="Add Comment"  name="add-comment-modal" value={post.id} onClick={handleOpenCloseModel} />
            </CardActions>
            <Modal
              isOpen={modals.editPost}
              contentLabel="Modal"
            >
              <EditPost
                post={post}
                handleInputChange={(event) => {
                  handleInputChange(event);
                }}
                updatePage={(page) => {
                  updatePage(page);
                }}
              />
            </Modal>
          </Card>
          <Route
            path="/:category/:id"
            render={() => (
              <ListComments
                post={post}
                updatePage={(page) => {
                  updatePage(page);
                }}
                handleInputChangeComment={(event) => {
                  handleInputChangeComment(event);
                }}
                handleOpenCloseModel={(event) => {
                  handleOpenCloseModel(event);
                }}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { comments, modals } = state;

  return {
    comments,
    modals,
  };
}

export default connect(mapStateToProps)(Post);
