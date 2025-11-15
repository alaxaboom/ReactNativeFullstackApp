import { LoanApplication } from '../types';

export const getLatestCredits = (credits: LoanApplication[], limit: number = 3): LoanApplication[] => {
  if (credits.length === 0) return [];
  return [...credits]
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    })
    .slice(0, limit);
};

