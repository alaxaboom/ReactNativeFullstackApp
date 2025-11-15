import { RootState } from '../../../shared/api/store';

export const selectLoanForm = (state: RootState) => state.loan;
export const selectSelectedProduct = (state: RootState) => state.loan.selectedProduct;
export const selectLoanAmount = (state: RootState) => state.loan.loanAmount;
export const selectLoanPeriod = (state: RootState) => state.loan.loanPeriod;
export const selectLoanUserData = (state: RootState) => state.loan.userData;
export const selectCurrentStep = (state: RootState) => state.loan.currentStep;

