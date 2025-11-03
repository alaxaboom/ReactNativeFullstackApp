import { Router } from 'express';
import userController from '../controllers/userController';
import {authMiddleware} from '../middleware/auth';
import { uploadAvatar } from '../utils/uploadAvatar';
const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/refresh', userController.refresh);

router.get('/me', authMiddleware, userController.getMe);
router.patch('/me/phone', authMiddleware, userController.updatePhone);
router.patch('/me/email', authMiddleware, userController.updateEmail);
router.patch('/me/location', authMiddleware, userController.updateLocation);
router.post('/me/avatar', authMiddleware, uploadAvatar.single('avatar'), userController.uploadAvatar);

router.delete('/:id',  userController.deleteUser);
router.get('/',  userController.getAllUsers);
router.get('/:id',  userController.getUserById);

router.post('/password-reset/request', userController.requestPasswordReset);
router.post('/password-reset/verify', userController.verifyPasswordResetCode);
router.post('/password-reset/reset', userController.resetPassword);

export default router;