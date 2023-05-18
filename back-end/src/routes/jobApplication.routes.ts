import express from 'express';
import * as applicationController from '../controllers/application.controller';
import { authMiddleware } from '../middleware/jwt.middleware';

const router = express.Router();

router.get('/', applicationController.getAllJobApplications);
router.post('/', applicationController.createJobApplication);
router.delete('/:applicationId', authMiddleware, applicationController.deleteJobApplication);

export default router;
