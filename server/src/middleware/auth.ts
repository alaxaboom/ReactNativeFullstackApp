
import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../strategy/jwtStrategy';

export interface AuthenticatedRequest extends Request {
  user: { id: number };
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Access token required' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = verifyAccessToken(token ?? 'invalid_token');
    (req as AuthenticatedRequest).user = { id: payload.id };
    next();
  } catch {
    res.status(401).json({ error: 'Invalid access token' });
    
  }
};
