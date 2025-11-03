import { User } from '../../../types';

export const getUserName = (user: User | null): string => {
  return user?.firstName || 'User';
};