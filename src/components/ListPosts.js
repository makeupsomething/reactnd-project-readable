import React, { Component } from 'react';
import Post from './Post';
import ListComments from './ListComments';
import CreateComment from './CreateComment';
import { connect } from 'react-redux';
import Modal from 'react-modal'
import Sort from './Sort';
import {
  fetchCommentsIfNeeded,
} from '../actions';
/**
* @description Component for listing the shelves
*/
class ListPosts extends Component {
  getComments(id) {
    const { dispatch } = this.props;
    dispatch(fetchCommentsIfNeeded(id));
  }

  render() {
    const { posts, modals, comments, pages, categories, updatePage, handleInputChange, handleOpenCloseModel, sortPostsOrComments, handleInputChangeComment } = this.props

    let postList = []

    if(posts.posts) {
      if(pages.current_page == "home") {
        postList = posts.posts.filter(post => (post.deleted === false))
      } else if (categories.categories.indexOf(pages.current_page) > -1 ) {
        postList = posts.posts.filter(post => (post.deleted === false && post.category === pages.current_page))
      }
      else {
        postList = posts.posts.filter(post => (post.deleted === false && post.id === pages.current_page))
      }
    }

    if(posts.sortBy === 'score') {
      postList.sort((a, b) => {
        return b.voteScore - a.voteScore;
      });
    } else if(posts.sortBy === 'date') {
      postList.sort((a, b) => {
        return b.timestamp - a.timestamp;
      });
    }
    console.log(postList)
    return (
      <div className="list-books-content">
        {postList.map(post => (
          <div key={post.id}>
            <Post
              post={post}
              posts={posts}
              modals={modals}
              getComments={(id) => {
                this.getComments(id);
              }}
              comments={comments.comments.filter(comment => (comment.deleted === false && comment.parentId === post.id))}
              updatePage={(page) => {
                updatePage(page);
              }}
              handleInputChange={(event) => {
                handleInputChange(event);
              }}
              updatePage={(page) => {
                updatePage(page);
              }}
              handleOpenCloseModel={(event) => {
                handleOpenCloseModel(event);
              }}
            />
            <button name="add-comment-modal" value={post.id} onClick={handleOpenCloseModel}>
              Add Comment%
            </button>
            <Modal
              isOpen={modals.newComment}
              contentLabel="Modal"
            >
              <CreateComment
                parent={modals.parentId}
                handleInputChangeComment={(parentId) => {
                  handleInputChangeComment(parentId);
                }}
              />
            </Modal>
          </div>
        ))}
        <Sort
          isPost={true}
          sortPostsOrComments={(isPost, sortBy) => {
            sortPostsOrComments(isPost, sortBy);
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { posts, comments, modals, pages, categories } = state;

  return {
    posts,
    comments,
    modals,
    pages,
    categories
  };
}

export default connect(mapStateToProps)(ListPosts);
