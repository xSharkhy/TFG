import * as userController from '../controllers/user.controller';
import express from "express";

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

export default router;