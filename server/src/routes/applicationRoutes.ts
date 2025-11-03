import { Router } from 'express';
import applicationController from '../controllers/applicationController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', authMiddleware, applicationController.createApplication);

router.get('/my/applications', authMiddleware, applicationController.getMyApplications);
router.get('/my/credits', authMiddleware, applicationController.getMyCredits);

router.get('/:id', authMiddleware, applicationController.getApplicationById);
router.get('/credits/:id', authMiddleware, applicationController.getCreditById);

router.patch('/:id/approve', applicationController.approveApplication);

router.delete('/:id', authMiddleware, applicationController.deleteApplicationOrCredit);

export default router;