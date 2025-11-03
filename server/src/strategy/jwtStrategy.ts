import jwt, { SignOptions } from 'jsonwebtoken';
import { JwtPayload } from './types';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

const getExpiresIn = (envValue: string | undefined, fallback: string): string => {
  return envValue ?? fallback;
};

export const generateTokens = (payload: Omit<JwtPayload, 'type'>) => {
  const accessToken = jwt.sign(
    { ...payload, type: 'access' } as JwtPayload,
    ACCESS_TOKEN_SECRET,
    { expiresIn: getExpiresIn(process.env.ACCESS_TOKEN_EXPIRES_IN, '15m') } as SignOptions
  );
  const refreshToken = jwt.sign(
    { ...payload, type: 'refresh' } as JwtPayload,
    REFRESH_TOKEN_SECRET,
    { expiresIn: getExpiresIn(process.env.REFRESH_TOKEN_EXPIRES_IN, '7d') } as SignOptions
  );
  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtPayload;
  } catch (error) {
    console.error('Refresh token verification failed:', (error as Error).message);
    throw new Error('Invalid refresh token');
  }
};