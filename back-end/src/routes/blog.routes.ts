import express from 'express';
import * as blogPostController from '../controllers/post.controller';
import { authMiddleware } from '../middleware/jwt.middleware';

const router = express.Router();

router.get('/', blogPostController.getAllBlogPosts);
router.get('/:postId', authMiddleware, blogPostController.getBlogPostById);
router.post('/', authMiddleware, blogPostController.createBlogPost);
router.put('/:postId', authMiddleware, blogPostController.updateBlogPost);
router.delete('/:postId', authMiddleware, blogPostController.deleteBlogPost);

export default router;
