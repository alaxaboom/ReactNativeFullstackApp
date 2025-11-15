import { useState, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../lib/react-redux/hooks";
import {
  useCreateApplicationMutation,
  useGetMyApplicationsQuery,
  useGetMyCreditsQuery,
  useApproveApplicationMutation,
} from "../../entities/loan-application";
import { resetLoanForm, prefillUserData } from "../../entities/loan-application";
import { CreateApplicationDto } from "../types";
import { extractErrorMessage } from "../utils/errorUtils";

export const useLoanManagement = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const loanForm = useAppSelector((state) => state.loan);

  const [createApplication, { isLoading: isCreating }] =
    useCreateApplicationMutation();
  const [updateApplicationStatus] = useApproveApplicationMutation();

  const {
    data: userApplications = [],
    isLoading: applicationsLoading,
    refetch: refetchApplications,
  } = useGetMyApplicationsQuery(undefined, {
    skip: !user?.id,
  });

  const {
    data: userLoans = [],
    isLoading: loansLoading,
    refetch: refetchLoans,
  } = useGetMyCreditsQuery(undefined, {
    skip: !user?.id,
  });

  const [error, setError] = useState<string | null>(null);

  const submitLoanApplication = async (userId?: string) => {
    try {
      setError(null);

      const effectiveUser = userId
        ? { id: userId }
        : user;

      if (!effectiveUser?.id) {
        throw new Error("Authorization required to submit application");
      }

      if (!loanForm.selectedProduct) {
        throw new Error("Please select a credit product");
      }

      if (
        !loanForm.userData.firstName ||
        !loanForm.userData.lastName ||
        !loanForm.userData.phone ||
        !loanForm.userData.jmbg
      ) {
        throw new Error("Please fill in all required fields");
      }

      const interestRate = 0.16678;
      const fee = 0;
      const monthlyRate = interestRate / 12;
      const monthlyRepayment = Math.round(
        (loanForm.loanAmount *
          (monthlyRate * Math.pow(1 + monthlyRate, loanForm.loanPeriod))) /
          (Math.pow(1 + monthlyRate, loanForm.loanPeriod) - 1)
      );
      const totalToReturn = monthlyRepayment * loanForm.loanPeriod;

      const productTypeMap: Record<string, string> = {
        'microloan': 'non_purpose_microloan',
        'pensioner': 'non_purpose_microloan',
        'installment': 'non_purpose_microloan',
        'sonic': 'non_purpose_microloan',
        'quick': 'non_purpose_microloan'
      };

      const applicationData: CreateApplicationDto = {
        productType: productTypeMap[loanForm.selectedProduct],
        loanAmount: loanForm.loanAmount,
        periodMonths: loanForm.loanPeriod,
        interestRate: interestRate,
        fee: fee,
        totalToReturn: totalToReturn,
        monthlyRepayment: monthlyRepayment,
        firstInstallmentDueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      };

      const newApplication = await createApplication(applicationData).unwrap();

      dispatch(resetLoanForm());

      return { success: true, application: newApplication };
    } catch (err: unknown) {
      const errorMessage = extractErrorMessage(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const prefillFormWithUserData = useCallback(() => {
    if (user) {
      dispatch(
        prefillUserData({
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          jmbg: user.jmbg,
        })
      );
    }
  }, [user, dispatch]);

  const getApplicationsStats = () => {
    const pending = userApplications.filter(
      (app) => app.status === "pending"
    ).length;
    const approved = userApplications.filter(
      (app) => app.status === "approved"
    ).length;
    const rejected = userApplications.filter(
      (app) => app.status === "rejected"
    ).length;
    const completed = userApplications.filter(
      (app) => app.status === "paid_off"
    ).length;

    return {
      total: userApplications.length,
      pending,
      approved,
      rejected,
      completed,
    };
  };

  const getLoansStats = () => {
    const active = userLoans.filter((loan) => loan.status === "approved").length;
    const paid = userLoans.filter((loan) => loan.status === "paid_off").length;
    const overdue = userLoans.filter(
      (loan) => loan.status === "rejected"
    ).length;
    const totalDebt = userLoans
      .filter((loan) => loan.status === "approved")
      .reduce((sum, loan) => sum + (loan.loanAmount || 0), 0);

    return {
      total: userLoans.length,
      active,
      paid,
      overdue,
      totalDebt,
    };
  };

  const simulateStatusChange = async (
    applicationId: string,
  ) => {
    try {
      await updateApplicationStatus(applicationId).unwrap();
      await refetchApplications();
      return { success: true };
    } catch (err: unknown) {
      return {
        success: false,
        error: extractErrorMessage(err),
      };
    }
  };

  return {
    loanForm,
    userApplications,
    userLoans,
    applicationsStats: getApplicationsStats(),
    loansStats: getLoansStats(),
    isCreating,
    applicationsLoading,
    loansLoading,
    error,
    submitLoanApplication,
    prefillFormWithUserData,
    simulateStatusChange,
    refetchApplications,
    refetchLoans,
    clearError: () => setError(null),
  };
};

