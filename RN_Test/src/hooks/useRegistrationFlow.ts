import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setCurrentStep } from '../store/loanSlice';
import { useAuth } from '../hooks/useAuth';
import { useLoanManagement } from '../hooks/useLoanManagement';
import { NavigationFunction } from '../types/index';

type UseRegistrationFlowProps = {
  onNavigate: NavigationFunction;
  onExitLoanProcess: () => void;
};

export const useRegistrationFlow = ({}: UseRegistrationFlowProps) => {
  const dispatch = useAppDispatch();
  const loanForm = useAppSelector((state) => state.loan);
  const { isAuthenticated, createUserOnly, loginUser } = useAuth();
  const { submitLoanApplication } = useLoanManagement();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [justRegistered, setJustRegistered] = useState(false);

  const handleRegistrationSubmit = useCallback(async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      await AsyncStorage.setItem("in_loan_process", "true");

      if (!isAuthenticated) {
        if (
          !loanForm.userData.firstName.trim() ||
          !loanForm.userData.lastName.trim() ||
          !loanForm.userData.phone.trim() ||
          !loanForm.userData.jmbg.trim()
        ) {
          Alert.alert("Error", "Please fill in all required fields");
          await AsyncStorage.removeItem("in_loan_process");
          return;
        }

        if (loanForm.userData.jmbg.length !== 13) {
          Alert.alert("Error", "JMBG must be 13 digits");
          await AsyncStorage.removeItem("in_loan_process");
          return;
        }

        if (password.length < 6) {
          Alert.alert("Error", "Password must be at least 6 characters");
          await AsyncStorage.removeItem("in_loan_process");
          return;
        }

        if (password !== confirmPassword) {
          Alert.alert("Error", "Passwords do not match");
          await AsyncStorage.removeItem("in_loan_process");
          return;
        }

        if (!isChecked) {
          Alert.alert("Error", "Please accept the terms and conditions");
          await AsyncStorage.removeItem("in_loan_process");
          return;
        }

        const userData = {
          firstName: loanForm.userData.firstName.trim(),
          lastName: loanForm.userData.lastName.trim(),
          phone: loanForm.userData.phone.trim(),
          jmbg: loanForm.userData.jmbg.trim(),
          password: password,
          ...(email.trim() && { email: email.trim() }),
        };

        const createResult = await createUserOnly(userData);
        if (!createResult.success || !createResult.user) {
          Alert.alert("Registration Error", createResult.error || "Unable to create account");
          await AsyncStorage.removeItem("in_loan_process");
          return;
        }

        const userWithPassword = {
          ...createResult.user,
          password: password,
          phone: userData.phone,
          email: userData.email
        };

        const loginResult = await loginUser(userWithPassword);
        if (!loginResult.success) {
          Alert.alert("Login Error", loginResult.error || "Unable to login after registration");
          await AsyncStorage.removeItem("in_loan_process");
          return;
        }

        await new Promise<void>((resolve) => {
          setTimeout(() => resolve(), 100);
        });
        
        const submitResult = await submitLoanApplication(loginResult.user?.id?.toString());
        if (!submitResult.success) {
          await AsyncStorage.removeItem("in_loan_process");
          Alert.alert("Error", submitResult.error || "Unable to submit application");
          return;
        }

        setJustRegistered(true);
        dispatch(setCurrentStep("documents"));
      } else {
        const submitResult = await submitLoanApplication();
        if (!submitResult.success) {
          Alert.alert("Error", submitResult.error || "Unable to submit application");
          return;
        }
        dispatch(setCurrentStep("documents"));
      }
    } finally {
      setIsProcessing(false);
    }
  }, [
    isProcessing,
    isAuthenticated,
    loanForm.userData.firstName,
    loanForm.userData.lastName,
    loanForm.userData.phone,
    loanForm.userData.jmbg,
    password,
    confirmPassword,
    email,
    isChecked,
    dispatch,
    createUserOnly,
    loginUser,
    submitLoanApplication,
  ]);

  const resetJustRegistered = useCallback(() => {
    setJustRegistered(false);
  }, []);

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isChecked,
    setIsChecked,
    isProcessing,
    justRegistered,
    handleRegistrationSubmit,
    resetJustRegistered,
    isAuthenticated,
  };
};