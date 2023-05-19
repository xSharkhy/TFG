import express from 'express';
import * as applicationController from '../controllers/application.controller';
import { authMiddleware } from '../middleware/jwt.middleware';

const router = express.Router();

router.get('/index', authMiddleware, applicationController.getAllJobApplications);
router.get('/show/:applicationId', authMiddleware, applicationController.getJobApplicationById);
router.put('/update/:applicationId', authMiddleware, applicationController.updateJobApplication);
router.post('/create', applicationController.createJobApplication);
router.delete('/delete/:applicationId', authMiddleware, applicationController.deleteJobApplication);

export default router;
