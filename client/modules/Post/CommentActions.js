import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const ADD_COMMENTS ='ADD_COMMENTS';

// Export Actions
export function addComment(data) {
  return {
    type: ADD_COMMENT,
    data,
  };
}

export function addCommentRequest(data) {
  return (dispatch) => {
    return callApi('comments', 'post', {
      comment: {
        author: data.author,
        comment: data.comment,
      },
    }).then(res => dispatch(addComment(res.comment)));
  };
}

export function editComment(data) {
  return {
    type: EDIT_COMMENT,
    data,
  };
}

export function fetchComments() {
  return (dispatch) => {
    return callApi('comments').then(res => {
      dispatch(addComments(res.comments));
    });
  };
}

export function editCommentRequest(data) {
  return (dispatch) => {
    return callApi('comments', 'put', {
      data: {
        id: data.id,
        comment: data.comment,
      },
    }).then(res => dispatch(addComments(res.comments)));
  };
}

export function addComments(comments) {
  return {
    type: ADD_COMMENTS,
    comments,
  };
}

export function deleteComment(cuid) {
  return {
    type: DELETE_COMMENT,
    cuid,
  };
}

export function deleteCommentRequest(cuid) {
  return (dispatch) => {
    return callApi(`comments/${cuid}`, 'delete').then(() => dispatch(deleteComment(cuid)));
  };
}
