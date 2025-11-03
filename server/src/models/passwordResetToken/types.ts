import { CreationOptional, ForeignKey, Optional } from 'sequelize';
import { UserAttributes } from '../user/types';

export interface PasswordResetTokenAttributes {
  id: number;
  userId: ForeignKey<UserAttributes['id']>;
  token: string;
  expiresAt: Date;
  used: boolean;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

export type PasswordResetTokenCreationAttributes = Optional<
  PasswordResetTokenAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;