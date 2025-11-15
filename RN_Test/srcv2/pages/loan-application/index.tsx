import React from "react";
import { LoanApplicationFlow } from "../../widgets/loan-application-flow";

interface LoanApplicationPageProps {
  onExitLoanProcess: () => void;
  screenParams?: { finalize?: boolean; product?: string };
}

export const LoanApplicationPage: React.FC<LoanApplicationPageProps> = ({
  onExitLoanProcess,
  screenParams,
}) => {
  return (
    <LoanApplicationFlow
      onExitLoanProcess={onExitLoanProcess}
      screenParams={screenParams}
    />
  );
};

