import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { addCommentRequest, fetchComments, deleteCommentRequest, editCommentRequest } from '../../CommentActions'
import { getComments } from '../../CommentReducer'
import styles from './PostDetailComments.css'

const PostDetailComments = ({comments, dispatch}) => {
  useEffect(() => {
    dispatch(fetchComments())
  }, [])

  const [state, setState] = useState({
    name: '',
    comment: '',
    editId: '',
    editComment: ''
  })

  const handleSubmit = e => {
    e.preventDefault()
    const data = {
      author: state.name,
      comment: state.comment
    }
    dispatch(addCommentRequest(data))
  }

  const handleChangeField = e => setState({ ...state, [e.target.name]: e.target.value})

  const handleEditComment = (id) => {
    const data = { id, comment: state.editComment }
    dispatch(editCommentRequest(data))
    setState({ ...state, editId: '', editComment: '' })
  }

  return (
    <div>
      <h3 className={styles["comments-title"]}>Comments</h3>
      <div className={styles["comments-list-wraapper"]}>
        {comments.length > 0 ? (
          <ul>
            {comments.map(c => (
              <li key={c._id}>
                <div className={styles["comment-top"]}>
                  <span>{c.author}</span> <span>{moment(c.dateAdded).format('DD.MM.YYYY')}</span>
                </div>
                {
                  state.editId === c._id
                  ? <textarea className={styles["edit-comment-textarea"]} name="editComment" value={state.editComment} onChange={handleChangeField} />
                  : <p>{c.comment}</p>
                }
                <div className={styles["comment-bottom"]}>
                  {state.editId === c._id ? (
                    <span onClick={() => handleEditComment(c._id)}>Save</span>
                  ) : (
                    <React.Fragment>
                      <span onClick={() => setState({ ...state, editId: c._id, editComment: c.comment })}>Edit</span>
                      <span onClick={() => dispatch(deleteCommentRequest(c._id))}>Delete</span>
                    </React.Fragment>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <span className={styles["no-comments"]}>No Comments</span>
        )}
      </div>
      <h3 className={styles["add-comments-title"]}>Add Comment</h3>
      <form className={styles["form-comment"]} onSubmit={e => handleSubmit(e)}>
        <div className={styles["field-name"]}>
          <label>Name:</label>
          <input
            name="name"
            value={state.name}
            onChange={handleChangeField}
          />
        </div>
        <div className={styles["field-comment"]}>
          <label>Comment:</label>
          <textarea
            name="comment"
            value={state.comment}
            onChange={handleChangeField}
          />
        </div>
        <button type="submit" className="button">Send</button>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    comments: getComments(state),
  }
}

export default connect(mapStateToProps)(PostDetailComments)
