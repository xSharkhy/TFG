import express from 'express';
import { login, signup, getUser } from '../controllers/auth.controller';
import { jwtMiddleware } from '../middleware/jwt.middleware';

const router = express.Router();

router.post('/signup', jwtMiddleware, signup);
router.post('/login', jwtMiddleware, login);
router.get('/user', jwtMiddleware, getUser);


export default router;
