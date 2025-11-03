import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoanFormData, LoanStep, LoanProductKey } from "../types";

const initialState: LoanFormData = {
  selectedProduct: "microloan",
  loanAmount: 1000,
  loanPeriod: 3,
  userData: {
    firstName: "",
    lastName: "",
    phone: "",
    jmbg: "",
  },
  currentStep: "productcategories",
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<LoanProductKey>) => {
      state.selectedProduct = action.payload;
    },
    setLoanAmount: (state, action: PayloadAction<number>) => {
      state.loanAmount = action.payload;
    },
    setLoanPeriod: (state, action: PayloadAction<number>) => {
      state.loanPeriod = action.payload;
    },
    setUserData: (
      state,
      action: PayloadAction<Partial<LoanFormData["userData"]>>
    ) => {
      state.userData = { ...state.userData, ...action.payload };
    },
    setCurrentStep: (state, action: PayloadAction<LoanStep>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      const steps: LoanStep[] = [
        "productcategories",
        "calculator",
        "registration",
        "documents",
        "confirmation",
      ];
      const currentIndex = steps.indexOf(state.currentStep);
      if (currentIndex < steps.length - 1) {
        state.currentStep = steps[currentIndex + 1];
      }
    },
    previousStep: (state) => {
      const steps: LoanStep[] = [
        "productcategories",
        "calculator",
        "registration",
        "documents",
        "confirmation",
      ];
      const currentIndex = steps.indexOf(state.currentStep);
      if (currentIndex > 0) {
        state.currentStep = steps[currentIndex - 1];
      }
    },
    resetLoanForm: () => {
      return { ...initialState };
    },
    prefillUserData: (
      state,
      action: PayloadAction<{
        firstName: string;
        lastName: string;
        phone: string;
        jmbg: string;
      }>
    ) => {
      state.userData = action.payload;
    },
  },
});

export const {
  setSelectedProduct,
  setLoanAmount,
  setLoanPeriod,
  setUserData,
  setCurrentStep,
  nextStep,
  previousStep,
  resetLoanForm,
  prefillUserData,
} = loanSlice.actions;

export default loanSlice.reducer;