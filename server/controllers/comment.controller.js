import Comment from '../models/comment';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all comments
 * @param req
 * @param res
 * @returns void
 */
export function getComments(req, res) {
  Comment.find().sort('-dateAdded').exec((err, comments) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ comments });
  });
}

/**
 * Save a comment
 * @param req
 * @param res
 * @returns void
 */
export function addComment(req, res) {
  if (!req.body.comment.author || !req.body.comment.comment) {
    res.status(403).end();
  }

  const newComment = new Comment(req.body.comment);

  // Let's sanitize inputs
  newComment.author = sanitizeHtml(newComment.author);
  newComment.comment = sanitizeHtml(newComment.comment);
  newComment.cuid = cuid();
  newComment.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ comment: saved });
  });
}

/**
 * Edit a comment
 * @param req
 * @param res
 * @returns void
 */
export function editComment(req, res) {
  if (!req.body.comment.id || !req.body.comment.comment) {
    res.status(403).end();
  }

  const editComment = Comment.findById(req.body.comment.id);

  // Let's sanitize inputs
  editComment.comment = sanitizeHtml(newComment.comment);
  editComment.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ comment: saved });
  });
}

/**
 * Delete a comment
 * @param req
 * @param res
 * @returns void
 */
export function deleteComment(req, res) {
  Comment.findOne({ cuid: req.params.cuid }).exec((err, comment) => {
    if (err) {
      res.status(500).send(err);
    }

    comment.remove(() => {
      res.status(200).end();
    });
  });
}
