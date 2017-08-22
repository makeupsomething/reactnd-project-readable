import React, { Component } from 'react';
import { fetchCategoriesIfNeeded, fetchPostsIfNeeded, addPostIfPossible, updateWipPost, fetchCommentsIfNeeded } from '../actions';
import { connect } from 'react-redux';
import Posts from './Posts';
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategoriesIfNeeded());
    dispatch(fetchPostsIfNeeded());
    //dispatch(fetchCommentsIfNeeded("8xf0y6ziyjabvozdd253nd"));
  }

  addNewPost() {
    const { dispatch, posts } = this.props
    const id = Math.random().toString(36).substr(-8);
    const timestamp = Date.now();
    const title = posts.wip_title;
    const body = posts.wip_body;
    const owner = posts.wip_owner;
    const category = posts.wip_category;
    dispatch(addPostIfPossible(id, timestamp, title, body, owner, category));
  }

  handleInputChange(event) {
    if(event) {
      const { dispatch, posts } = this.props
      const target = event.target;
      let title = ''
      let body = ''
      let category = ''
      let owner = ''
      if(target.name === 'title')
      {
        title = target.value
        body = posts.wip_body
        category = posts.wip_category
        owner = posts.wip_owner
        dispatch(updateWipPost(title, body, category, owner))
      }
      else if (target.name === 'body')
      {
        body = target.value
        title = posts.wip_title
        category = posts.wip_category
        owner = posts.wip_owner
        dispatch(updateWipPost(title, body, category, owner))
      }
      else if (target.name === 'category')
      {
        body = posts.wip_body
        title = posts.wip_title
        category = target.value
        owner = posts.wip_owner
        dispatch(updateWipPost(title, body, category, owner))
      }
      else if (target.name === 'owner')
      {
        body = posts.wip_body
        title = posts.wip_title
        category = posts.wip_category
        owner = target.value
        dispatch(updateWipPost(title, body, category, owner))
      }
    }
  }

  handleSubmit(event) {
    const { dispatch, posts } = this.props
    const id = Math.random().toString(36).substr(-8);
    const timestamp = Date.now();
    const title = posts.wip_title;
    const body = posts.wip_body;
    const owner = posts.wip_owner;
    const category = posts.wip_category;
    dispatch(addPostIfPossible(id, timestamp, title, body, owner, category));
    event.preventDefault();
  }

  render() {
    const { categories, posts } = this.props
    let allCats = categories.categories;
    let postList = posts.posts;
    if(!allCats){
      allCats = []
    }
    if(!postList){
      postList = []
    }
    return (
      <div>
        {allCats.map(item => (<p key={item}>{item}</p>))}
        <Posts
          categories={categories}
          posts={posts}
          handleInputChange={(event) => {
            this.handleInputChange(event);
          }}
          handleSubmit={(event) => {
            this.handleSubmit(event);
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { categories, posts } = state

  return {
    categories,
    posts,
  }
}

export default connect(mapStateToProps)(App)
