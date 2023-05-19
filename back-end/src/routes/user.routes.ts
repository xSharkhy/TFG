import express from 'express';
import * as userController from '../controllers/user.controller';
import { authMiddleware } from '../middleware/jwt.middleware';

const router = express.Router();

router.get('/index', userController.getAllUsers);
router.get('/show/:userId', authMiddleware, userController.getUserProfile);
router.put('/profile/:userId', authMiddleware, userController.updateUserProfile);

export default router;
