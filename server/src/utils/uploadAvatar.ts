import multer from 'multer';
import path from 'path';
import { Request } from 'express';
import { AuthenticatedRequest } from '../middleware/auth'; 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', '..', 'static', 'avatars');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const authenticatedReq = req as AuthenticatedRequest;
    const ext = path.extname(file.originalname);
    const filename = `user_${authenticatedReq.user.id}_${Date.now()}${ext}`;
    cb(null, filename);
  },
});

export const uploadAvatar = multer({ storage });