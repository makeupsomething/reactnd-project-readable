import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import { Card, CardActions, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import UpDownVote from './UpDownVote';
import DeleteButton from './DeleteButton';
import EditComment from './EditComment';


class Comment extends Component {
  render() {
    const {
      comment,
      modals,
      updatePage,
      handleInputChangeComment,
      handleOpenCloseEditCommentModel,
    } = this.props;

    const style = {
      margin: 5,
    };

    return (
      <div className="list-books-content">
        <div>
          <Card>
            <CardText>
              {comment.body}
            </CardText>
            <CardActions>
              <UpDownVote
                post={comment}
                isPost={false}
                label="Up Vote"
                name="upVote"
              />
              <UpDownVote
                post={comment}
                isPost={false}
                label="Down Vote"
                name="downVote"
              />
              <RaisedButton style={style} label="Edit Comment" name="edit-comment-modal" value={comment.id} onClick={e => handleOpenCloseEditCommentModel(e, comment)} />
              <DeleteButton
                post={comment}
                isPost={false}
              />
              <Badge
                badgeContent={comment.voteScore}
                primary
              >
                <NotificationsIcon />
              </Badge>
            </CardActions>
          </Card>
          <Dialog
            title="Edit Comment"
            repositionOnUpdate={false}
            actions={
              <EditComment
                comment={comment}
                handleInputChangeComment={(event) => {
                  handleInputChangeComment(event);
                }}
                updatePage={(page) => {
                  updatePage(page);
                }}
              />
            }
            modal={false}
            open={modals.editComment}
            onRequestClose={handleOpenCloseEditCommentModel}
          >
            Change it up
          </Dialog>
        </div>
        <br />
        <br />
      </div>
    );
  }
}

export default Comment;
