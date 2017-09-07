import React, { Component } from 'react';
/**
* @description Component for listing the shelves
*/
class CreateComment extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { parent, updateWipCommentParentId } = this.props;
    updateWipCommentParentId(parent)
  }
  /**
  * @description The render function
  * @returns { object } The UI
  */
  render() {
    const { handleInputChangeComment, handleSubmitComment } = this.props;

    return (
      <div className="list-books-content">
        <form>
          <label name="body">
            Body:
            <textarea name="body" value={undefined} onChange={handleInputChangeComment} />
          </label>
          <label name="owner">
        Owner:
            <input name="owner" type="text" value={undefined} onChange={handleInputChangeComment} />
          </label>
          <input type="submit" value="Submit Comment" onClick={handleSubmitComment} className="icon-btn" />
        </form>
      </div>
    );
  }
}
export default CreateComment;
