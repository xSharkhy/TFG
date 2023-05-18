import express from 'express';
import * as forumThreadController from '../controllers/thread.controller';
import { authMiddleware } from '../middleware/jwt.middleware';

const router = express.Router();

router.get('/', forumThreadController.getAllForumThreads);
router.get('/:threadId', forumThreadController.getForumThreadById);
router.post('/', authMiddleware, forumThreadController.createForumThread);
router.put('/:threadId', authMiddleware, forumThreadController.updateForumThread);
router.delete('/:threadId', authMiddleware, forumThreadController.deleteForumThread);
router.post('/:threadId/comment', authMiddleware, forumThreadController.addComment);
router.delete('/:threadId/comment/:commentId', authMiddleware, forumThreadController.deleteComment);

export default router;
