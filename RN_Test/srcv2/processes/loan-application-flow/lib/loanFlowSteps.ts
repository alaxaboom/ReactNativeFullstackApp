import { LoanStep } from '../../../shared/types';

export const LOAN_STEPS: LoanStep[] = [
  'productcategories',
  'calculator',
  'registration',
  'documents',
  'confirmation',
];

export const getNextStep = (currentStep: LoanStep): LoanStep | null => {
  const currentIndex = LOAN_STEPS.indexOf(currentStep);
  if (currentIndex < LOAN_STEPS.length - 1) {
    return LOAN_STEPS[currentIndex + 1];
  }
  return null;
};

export const getPreviousStep = (currentStep: LoanStep): LoanStep | null => {
  const currentIndex = LOAN_STEPS.indexOf(currentStep);
  if (currentIndex > 0) {
    return LOAN_STEPS[currentIndex - 1];
  }
  return null;
};


