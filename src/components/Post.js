import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';

import UpDownVote from './UpDownVote';
import DeleteButton from './DeleteButton';
import EditPost from './EditPost';
import ListComments from './ListComments';

import {
  fetchCommentsIfNeeded,
  editPostModal,
  newCommentModal,
} from '../actions';

import Dialog from 'material-ui/Dialog';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

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
      handleOpenCloseAddCommentModel
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
            <CardText>
              {post.body}
            </CardText>
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
              <RaisedButton
                style={style}
                label={`View Comments(${numComments.length})`}
                onClick={() => { updatePage(post.id); }}
                containerElement={<Link
                    to={`/${post.category}/${post.id}`}
                    className={post.id}
                    value={post.id}
                  />}
              />
              <RaisedButton style={style} label="Edit Post" name="edit-post-modal" value={post.id} onClick={(e) => this.handleOpenCloseEditPostModel(e, post.id)} />
              <DeleteButton
                post={post}
                isPost
              />
              <RaisedButton style={style} label="Add Comment"  name="add-comment-modal" value={post.id} onClick={(e) => handleOpenCloseAddCommentModel(e, post.id)} />
              <Badge
                badgeContent={post.voteScore}
                primary={true}
              >
                <NotificationsIcon />
              </Badge>
            </CardActions>
          </Card>
          <Dialog
            title="Edit Post"
            repositionOnUpdate={ false }
            actions={
              <EditPost
                post={post}
                handleInputChange={(event) => {
                  handleInputChange(event);
                }}
                updatePage={(page) => {
                  updatePage(page);
                }}
                handleOpenCloseEditPostModel={(event) => {
                  this.handleOpenCloseEditPostModel(event);
                }}
              />
            }
            modal={false}
            open={modals.editPost}
            onRequestClose={this.handleOpenCloseEditPostModel}
          >
            Change it up
          </Dialog>
          <Route
            path="/:category/:id"
            render={() => (
              <div>
              <br />
              <br />
              <ListComments
                post={post}
                updatePage={(page) => {
                  updatePage(page);
                }}
                handleInputChangeComment={(event) => {
                  handleInputChangeComment(event);
                }}
                handleOpenCloseAddCommentModel={(event) => {
                  this.handleOpenCloseAddCommentModel(event);
                }}
              />
              </div>
            )}
          />
        </div>
        <br />
        <br />
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
