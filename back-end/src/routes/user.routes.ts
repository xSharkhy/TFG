import express from 'express';
import * as userController from '../controllers/user.controller';
import { authMiddleware } from '../middleware/jwt.middleware';
import { verifyAuth } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile/:userId', authMiddleware, userController.getUserProfile);
router.put('/profile/:userId', authMiddleware, userController.updateUserProfile);
router.get('/verify', verifyAuth);

export default router;
