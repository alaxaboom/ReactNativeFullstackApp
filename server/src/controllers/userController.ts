import { Request, Response } from 'express';
import User from '../models/user/model';
import PasswordResetToken from '../models/passwordResetToken/model';
import { UserCreationAttributes, UserLoginAttributes } from '../models/user/types';
import { generateTokens, verifyRefreshToken } from '../strategy/jwtStrategy';
import crypto from 'crypto';
import { AuthenticatedRequest } from '../middleware/auth';
import { PhoneUpdateDto } from '../dto/user.dto';
import bcryptjs from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';
import { WhereOptions } from 'sequelize';

// Вспомогательный тип для условий поиска пользователя
type UserWhereCondition = {
  jmbg: string;
  phone?: string;
  email?: string;
};

class UserController {
  public async register(
    req: Request<{}, {}, UserCreationAttributes>,
    res: Response
  ): Promise<void> {
    console.log('📥 [REGISTER] Received data:', req.body);
    try {
      const { firstName, lastName, phone, jmbg, password, email } = req.body;
      const hashedPassword = await User.hashPassword(password);
      const user = await User.create({
        firstName,
        lastName,
        phone,
        jmbg,
        password: hashedPassword,
        email: email ?? null,
      });
      const { accessToken, refreshToken } = generateTokens({ id: Number(user.id) });
      res.status(201).json({ user, accessToken, refreshToken });
    } catch (error) {
      console.error('💥 [REGISTER] Error:', (error as Error).message);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  public async login(
    req: Request<{}, {}, { phoneOrEmail: string; password: string }>,
    res: Response
  ): Promise<void> {
    console.log('📥 [LOGIN] Attempt with:', req.body.phoneOrEmail);
    try {
      const { phoneOrEmail, password } = req.body;

      if (!phoneOrEmail || !password) {
        res.status(400).json({ error: 'Phone/email and password are required' });
        return;
      }

      const isEmail = phoneOrEmail.includes('@');
      const whereCondition: WhereOptions = isEmail
        ? { email: phoneOrEmail }
        : { phone: phoneOrEmail };

      const user = await User.findOne({ where: whereCondition });
      if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      const { accessToken, refreshToken } = generateTokens({ id: user.id });
      res.json({ user, accessToken, refreshToken });
    } catch (error) {
      console.error('💥 [LOGIN] Error:', (error as Error).message);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  public async refresh(
    req: Request<{}, {}, { refreshToken: string }>,
    res: Response
  ): Promise<void> {
    console.log('📥 [REFRESH] Token received');
    try {
      const { refreshToken } = req.body;
      const payload = verifyRefreshToken(refreshToken);
      const user = await User.findByPk(payload.id);
      if (!user) {
        res.status(401).json({ error: 'Invalid refresh token' });
        return;
      }
      const { accessToken, refreshToken: newRefreshToken } = generateTokens({ id: user.id });
      res.json({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
      console.error('💥 [REFRESH] Error:', (error as Error).message);
      res.status(401).json({ error: 'Invalid refresh token' });
    }
  }

  public async updatePhone(req: Request, res: Response): Promise<void> {
    console.log('📥 [UPDATE_PHONE] Received data:', req.body);
    try {
      const result = PhoneUpdateDto.safeParse(req.body);
      if (!result.success) {
        res.status(400).json({ error: result.error.format() });
        return;
      }

      const { phone } = result.data;
      const userId = (req as AuthenticatedRequest).user.id;

      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      await user.update({ phone });
      res.json(user);
    } catch (error) {
      console.error('💥 [UPDATE_PHONE] Error:', (error as Error).message);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  public async updateEmail(
    req: Request<{}, {}, { email: string | null }>,
    res: Response
  ): Promise<void> {
    console.log('📥 [UPDATE_EMAIL] Received data:', req.body);
    try {
      const { email } = req.body;
      const userId = (req as AuthenticatedRequest).user.id;
      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      await user.update({ email });
      res.json(user);
    } catch (error) {
      console.error('💥 [UPDATE_EMAIL] Error:', (error as Error).message);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  public async updateLocation(
    req: Request<{}, {}, { location: string | null }>,
    res: Response
  ): Promise<void> {
    console.log('📥 [UPDATE_LOCATION] Received data:', req.body);
    try {
      const { location } = req.body;
      const userId = (req as AuthenticatedRequest).user.id;
      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      await user.update({ location });
      res.json(user);
    } catch (error) {
      console.error('💥 [UPDATE_LOCATION] Error:', (error as Error).message);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  public async getMe(req: AuthenticatedRequest, res: Response): Promise<void> {
    console.log('📥 [GET_ME] Request from user ID:', req.user.id);
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(user);
    } catch (error) {
      console.error('💥 [GET_ME] Error:', (error as Error).message);
      res.status(500).json({ error: (error as Error).message });
    }
  }

  public async deleteUser(req: Request<{ id: string }>, res: Response): Promise<void> {
    console.log('📥 [DELETE_USER] Request to delete user ID:', req.params.id);
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      await user.destroy();
      res.status(204).send();
    } catch (error) {
      console.error('💥 [DELETE_USER] Error:', (error as Error).message);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  public async getAllUsers(_req: Request, res: Response): Promise<void> {
    console.log('📥 [GET_ALL_USERS] Request received');
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error('💥 [GET_ALL_USERS] Error:', (error as Error).message);
      res.status(500).json({ error: (error as Error).message });
    }
  }

  public async getUserById(req: Request<{ id: string }>, res: Response): Promise<void> {
    console.log('📥 [GET_USER_BY_ID] Request for user ID:', req.params.id);
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(user);
    } catch (error) {
      console.error('💥 [GET_USER_BY_ID] Error:', (error as Error).message);
      res.status(500).json({ error: (error as Error).message });
    }
  }

  public async requestPasswordReset(
    req: Request<{}, {}, { jmbg: string; phone?: string; email?: string }>,
    res: Response
  ): Promise<void> {
    console.log('📥 [REQUEST_PASSWORD_RESET] Received data:', req.body);
    try {
      const { jmbg, phone, email } = req.body;

      if (!phone && !email) {
        res.status(400).json({ error: 'Phone or email is required' });
        return;
      }

      const whereCondition: UserWhereCondition = { jmbg };
      if (phone) whereCondition.phone = phone;
      if (email) whereCondition.email = email;

      const user = await User.findOne({ where: whereCondition as WhereOptions });
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const token = crypto.randomInt(100000, 999999).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await PasswordResetToken.create({
        userId: user.id,
        token,
        expiresAt,
        used: false,
      });

      console.log(`🔐 [REQUEST_PASSWORD_RESET] Code generated for user ${user.id}`);
      res.status(200).json({ message: 'Password reset code sent' });
    } catch (error) {
      console.error('💥 [REQUEST_PASSWORD_RESET] Error:', (error as Error).message);
      res.status(500).json({ error: (error as Error).message });
    }
  }

  public async verifyPasswordResetCode(
    req: Request<{}, {}, { jmbg: string; phone?: string; email?: string; code: string }>,
    res: Response
  ): Promise<void> {
    console.log('📥 [VERIFY_PASSWORD_RESET_CODE] Received data:', req.body);
    try {
      const { jmbg, phone, email, code } = req.body;

      if (!phone && !email) {
        res.status(400).json({ error: 'Phone or email is required' });
        return;
      }

      const whereCondition: UserWhereCondition = { jmbg };
      if (phone) whereCondition.phone = phone;
      if (email) whereCondition.email = email;

      const user = await User.findOne({ where: whereCondition as WhereOptions });
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const resetToken = await PasswordResetToken.findOne({
        where: {
          userId: user.id,
          token: code,
          used: false,
        },
      });

      if (!resetToken || resetToken.expiresAt < new Date()) {
        res.status(400).json({ error: 'Invalid or expired code' });
        return;
      }

      await resetToken.update({ used: true });
      res.status(200).json({ userId: user.id });
    } catch (error) {
      console.error('💥 [VERIFY_PASSWORD_RESET_CODE] Error:', (error as Error).message);
      res.status(500).json({ error: (error as Error).message });
    }
  }

  public async resetPassword(
    req: Request<{}, {}, { userId: number; newPassword: string }>,
    res: Response
  ): Promise<void> {
    console.log('📥 [RESET_PASSWORD] Received data for user ID:', req.body.userId);
    try {
      const { userId, newPassword } = req.body;

      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const hashedPassword = await User.hashPassword(newPassword);
      await user.update({ password: hashedPassword });

      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('💥 [RESET_PASSWORD] Error:', (error as Error).message);
      res.status(500).json({ error: (error as Error).message });
    }
  }

  public async uploadAvatar(req: AuthenticatedRequest, res: Response): Promise<void> {
    console.log('📥 [UPLOAD_AVATAR] File received:', req.file?.filename || 'none');
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      if (!req.file) {
        res.status(400).json({ error: 'Avatar file is required' });
        return;
      }

      if (user.avatarPath) {
        const oldPath = path.join(__dirname, '..', '..', 'static', user.avatarPath.substring(1));
        try {
          await fs.unlink(oldPath);
        } catch (err) {
          console.warn('⚠️ [UPLOAD_AVATAR] Failed to delete old avatar:', err);
        }
      }

      const avatarPath = `/avatars/${req.file.filename}`;
      await user.update({ avatarPath });

      res.json({ avatarPath });
    } catch (error) {
      console.error('💥 [UPLOAD_AVATAR] Error:', (error as Error).message);
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default new UserController();