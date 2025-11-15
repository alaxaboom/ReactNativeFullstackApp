import { useAppDispatch, useAppSelector } from '../../../../shared/lib/react-redux/hooks';
import { setLoanAmount, setLoanPeriod } from '../../../../entities/loan-application';
import { calculateMonthlyPayment, getInterestAmount, getCommission, getTotalReturn } from '../../../../entities/loan-application';

export const useLoanCalculator = () => {
  const dispatch = useAppDispatch();
  const loanForm = useAppSelector((state) => state.loan);

  const updateLoanAmount = (amount: number) => {
    dispatch(setLoanAmount(amount));
  };

  const updateLoanPeriod = (period: number) => {
    dispatch(setLoanPeriod(period));
  };

  const monthlyPayment = calculateMonthlyPayment(loanForm.loanAmount, loanForm.loanPeriod);
  const interestAmount = getInterestAmount(loanForm.loanAmount, loanForm.loanPeriod);
  const commission = getCommission(loanForm.loanAmount);
  const totalReturn = getTotalReturn(loanForm.loanAmount, loanForm.loanPeriod);

  return {
    loanAmount: loanForm.loanAmount,
    loanPeriod: loanForm.loanPeriod,
    monthlyPayment,
    interestAmount,
    commission,
    totalReturn,
    updateLoanAmount,
    updateLoanPeriod,
  };
};



