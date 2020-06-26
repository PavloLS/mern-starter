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
  Comment.find({'postId': req.body.post.postId})
    .sort('-dateAdded')
    .populate('postId')
    .exec((err, comments) => {
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
  if (!req.body.comment.author || !req.body.comment.comment || !req.body.comment.postId) {
    res.status(403).end();
  }

  const newComment = new Comment(req.body.comment)

  // Let's sanitize inputs
  newComment.author = sanitizeHtml(newComment.author);
  newComment.comment = sanitizeHtml(newComment.comment);
  newComment.postId = sanitizeHtml(newComment.postId);
  newComment.cuid = cuid();
  newComment.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
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
  if (!req.body.data.id || !req.body.data.comment || !req.body.data.postId) {
    res.status(403).end();
  }

  Comment.findById(req.body.data.id).then(comment => {
    comment.comment = sanitizeHtml(req.body.data.comment);
    comment.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }
      Comment.find({'postId': req.body.data.postId}).sort('-dateAdded').populate('postId').exec((err, comments) => {
        if (err) {
          res.status(500).send(err);
        }
        res.json({ comments });
      });
    });
  })
}

/**
 * Delete a comment
 * @param req
 * @param res
 * @returns void
 */
export function deleteComment(req, res) {
  Comment.findOne({ _id: req.params.cuid }).exec((err, comment) => {
    if (err) {
      res.status(500).send(err);
    }

    comment.remove(() => {
      res.status(200).end();
    });
  });
}
