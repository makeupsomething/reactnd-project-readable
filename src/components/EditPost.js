import React, { Component } from 'react';
/**
* @description Component for listing the shelves
*/
class EditPost extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { loadEditPost, post } = this.props;
    loadEditPost(post)
  }
  /**
  * @description The render function
  * @returns { object } The UI
  */
  render() {
    const { posts, post, categories, handleInputChange, handleSubmitEdit } = this.props;
    let allCats = categories.categories;

    if (!allCats) {
      allCats = [];
    }

    return (
      <div className="list-books-content">
        <form>
          <label name="title">
            Title:
            <input name="title" type="text" value={posts.wip_title} onChange={handleInputChange} />
          </label>
          <label name="body">
            Body:
            <textarea name="body" value={posts.wip_body} onChange={handleInputChange} />
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
          <input type="submit" value="Submit" onClick={handleSubmitEdit} className="icon-btn" />
        </form>
      </div>
    );
  }
}
export default EditPost;
