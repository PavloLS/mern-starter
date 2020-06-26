import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
const router = new Router();

// Get all Comment
router.route('/comments').get(CommentController.getComments);

// Add a new Comment
router.route('/comments').post(CommentController.addComment);

// Adit a comment
router.route('/comments').put(CommentController.editComment);

// Delete a comment by cuid
router.route('/comments/:cuid').delete(CommentController.deleteComment);

export default router;
