import { Router } from 'express';
import userRoutes from './userRoutes';
import applicationRoutes from './applicationRoutes';
const router = Router();

router.use('/users', userRoutes);
router.use('/applications', applicationRoutes);
export default router;