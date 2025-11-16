import { LoanStep, LoanProductKey } from '../../../shared/types';

export interface LoanFlowState {
  currentStep: LoanStep;
  selectedProduct: LoanProductKey;
  loanAmount: number;
  loanPeriod: number;
}

export const INITIAL_LOAN_FLOW_STATE: LoanFlowState = {
  currentStep: 'productcategories',
  selectedProduct: 'microloan',
  loanAmount: 1000,
  loanPeriod: 3,
};


