import React, { useState } from 'react'
import styles from './PostDetailComments.css'

const PostDetailComments = () => {
  const [state, setState] = useState({
    name: '',
    comment: '',
    editId: '',
    editComment: ''
  })

  const handleSubmit = e => {
    e.preventDefault()
    console.log(state)
  }

  const handleChangeField = e => setState({ ...state, [e.target.name]: e.target.value})

  const comments = [
    {id: 1, author: 'John', date: '25.06.2020', comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
    {id: 2, author: 'Sara', date: '26.06.2020', comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' }
  ]

  return (
    <div>
      <h3 className={styles["comments-title"]}>Comments</h3>
      <div className={styles["comments-list-wraapper"]}>
        {comments.length > 0 ? (
          <ul>
            {comments.map(c => (
              <li key={c.id}>
                <div className={styles["comment-top"]}>
                  <span>{c.author}</span> <span>{c.date}</span>
                </div>
                {
                  state.editId === c.id
                  ? <textarea className={styles["edit-comment-textarea"]} name="editComment" value={state.editComment} onChange={handleChangeField} />
                  : <p>{c.comment}</p>
                }
                <div className={styles["comment-bottom"]}>
                  {state.editId === c.id ? (
                    <span>Save</span>
                  ) : (
                    <React.Fragment>
                      <span onClick={() => setState({ ...state, editId: c.id, editComment: c.comment })}>Edit</span>
                      <span>Delete</span>
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

export default PostDetailComments
