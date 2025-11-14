import { Router } from 'express';
import userRoutes from './userRoutes';
import applicationRoutes from './applicationRoutes';
import locationRoutes from './locationRoutes';
const router = Router();

router.use('/users', userRoutes);
router.use('/applications', applicationRoutes);
router.use('/locations', locationRoutes);
export default router;