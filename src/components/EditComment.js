import React, { Component } from 'react';
/**
* @description Component for listing the shelves
*/
class EditComment extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { loadEditComment, comment } = this.props;
    console.log("##########")
    console.log(comment)
    loadEditComment(comment)
  }
  /**
  * @description The render function
  * @returns { object } The UI
  */
  render() {
    const { comments, comment, categories, handleInputChangeComment, handleSubmitEditComment } = this.props;

    return (
      <div className="list-books-content">
        <form>
          <label name="body">
            Body:
            <textarea name="body" value={comments.wip_body} onChange={handleInputChangeComment} />
          </label>
          <label name="owner">
        Owner:
            <input name="owner" type="text" value={comments.wip_owner} onChange={handleInputChangeComment} />
          </label>
          <input type="submit" value="Submit Comment" onClick={handleSubmitEditComment} className="icon-btn" />
        </form>
      </div>
    );
  }
}
export default EditComment;
