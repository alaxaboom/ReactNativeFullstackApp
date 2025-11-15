export const calculateMonthlyPayment = (
  loanAmount: number,
  loanPeriod: number,
  interestRate: number = 0.16678
): number => {
  const monthlyRate = interestRate / 12;
  const numPayments = loanPeriod;
  const principal = loanAmount;

  const monthlyPayment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  return Math.round(monthlyPayment);
};

export const getInterestAmount = (loanAmount: number, loanPeriod: number): number => {
  return Math.round((loanAmount * 0.81) / loanPeriod);
};

export const getCommission = (loanAmount: number): number => {
  return Math.round(loanAmount * 0.08);
};

export const getTotalReturn = (
  loanAmount: number,
  loanPeriod: number,
  interestRate: number = 0.16678
): number => {
  const monthlyPayment = calculateMonthlyPayment(loanAmount, loanPeriod, interestRate);
  const commission = getCommission(loanAmount);
  return Math.round(monthlyPayment * loanPeriod + commission);
};

