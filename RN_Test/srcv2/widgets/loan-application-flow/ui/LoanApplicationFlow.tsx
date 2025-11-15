import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Text,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/react-redux/hooks';
import { setCurrentStep, resetLoanForm, setSelectedProduct } from '../../../entities/loan-application';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useLoanManagement } from '../../../shared/hooks/useLoanManagement';
import { useRegistrationFlow } from '../../../shared/hooks/useRegistrationFlow';
import { StepIndicator } from '../../../shared/ui/StepIndicator';
import { ProductSelectionGrid } from '../../../features/loan-application/select-product';
import { LoanCalculatorForm } from '../../../features/loan-application/calculate-loan';
import { RegistrationForm } from '../../../features/loan-application/fill-registration';
import { DocumentUploadForm } from '../../../features/loan-application/upload-documents';
import { ConfirmationDetails } from '../../../features/loan-application/confirm-application';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '../../../shared/lib/react-navigation/hooks';
import { useSmartNavigation } from '../../../shared/utils/smartNavigation';
import { styles } from './styles';

interface LoanApplicationFlowProps {
  onExitLoanProcess: () => void;
  screenParams?: { finalize?: boolean; product?: string };
}

export const LoanApplicationFlow: React.FC<LoanApplicationFlowProps> = ({
  onExitLoanProcess,
  screenParams,
}) => {
  const { navigateTo } = useNavigation();
  const dispatch = useAppDispatch();
  const loanForm = useAppSelector((state) => state.loan);
  const { user: authUser, isAuthenticated, loginUser } = useAuth();
  const { prefillFormWithUserData, isCreating: isSubmitting } = useLoanManagement();
  const { navigateToHomeOrFirst } = useSmartNavigation();
  const registrationFlow = useRegistrationFlow({ onNavigate: navigateTo, onExitLoanProcess });

  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);

  const finalizeLoan = useCallback(async () => {
    try {
      const pending = await AsyncStorage.getItem("loan_pending");
      if (pending) {
        const { user } = JSON.parse(pending);
        await loginUser(user);
        await AsyncStorage.removeItem("loan_pending");
      }
      onExitLoanProcess();
      dispatch(resetLoanForm());
      navigateToHomeOrFirst(navigateTo);
    } catch (error) {
      console.error("Finalize loan error:", error);
      Alert.alert("Error", "Failed to complete loan process");
      onExitLoanProcess();
    }
  }, [onExitLoanProcess, dispatch, navigateTo, navigateToHomeOrFirst, loginUser]);

  useEffect(() => {
    if (screenParams?.product) {
      dispatch(setCurrentStep('productcategories'));
    }
  }, [screenParams, dispatch]);

  useEffect(() => {
    if (isAuthenticated && authUser && !registrationFlow.justRegistered) {
      if (loanForm.currentStep === "registration") {
        prefillFormWithUserData();
      }
    }
  }, [isAuthenticated, authUser, loanForm.currentStep, registrationFlow.justRegistered, prefillFormWithUserData]);

  useEffect(() => {
    if (screenParams?.finalize) {
      setIsFinalizing(true);
      finalizeLoan();
    }
  }, [screenParams, finalizeLoan]);

  useEffect(() => {
    if (registrationFlow.justRegistered && loanForm.currentStep === "documents") {
      setTimeout(() => {
        registrationFlow.resetJustRegistered();
      }, 100);
    }
  }, [registrationFlow.justRegistered, loanForm.currentStep, registrationFlow.resetJustRegistered]);

  const handleBack = useCallback(() => {
    if (isProcessing || registrationFlow.isProcessing) return;
    switch (loanForm.currentStep) {
      case "calculator":
        dispatch(setCurrentStep("productcategories"));
        break;
      case "registration":
        dispatch(setCurrentStep("calculator"));
        break;
      case "documents":
        dispatch(setCurrentStep("registration"));
        break;
      case "confirmation":
        dispatch(setCurrentStep("documents"));
        break;
      default:
        onExitLoanProcess();
        navigateToHomeOrFirst(navigateTo);
        break;
    }
  }, [isProcessing, registrationFlow.isProcessing, loanForm.currentStep, dispatch, onExitLoanProcess, navigateTo, navigateToHomeOrFirst]);

  const handleNext = useCallback(async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      switch (loanForm.currentStep) {
        case "productcategories":
          if (loanForm.selectedProduct) {
            dispatch(setCurrentStep("calculator"));
          }
          break;
        case "calculator":
          dispatch(setCurrentStep("registration"));
          break;
        case "registration":
          await registrationFlow.handleRegistrationSubmit();
          break;
        case "documents":
          dispatch(setCurrentStep("confirmation"));
          break;
        case "confirmation":
          dispatch(resetLoanForm());
          const existingPasscode = await AsyncStorage.getItem("app_passcode");
          onExitLoanProcess();
          if (!existingPasscode) {
            navigateTo("password");
          } else {
            await finalizeLoan();
          }
          break;
      }
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, loanForm.currentStep, loanForm.selectedProduct, dispatch, registrationFlow, onExitLoanProcess, navigateTo, finalizeLoan]);

  const handleSkipDocuments = useCallback(() => {
    dispatch(setCurrentStep("confirmation"));
  }, [dispatch]);

  const handleContinueDocuments = useCallback(() => {
    dispatch(setCurrentStep("confirmation"));
  }, [dispatch]);

  const handleDone = useCallback(async () => {
    dispatch(resetLoanForm());
    onExitLoanProcess();
    const existingPasscode = await AsyncStorage.getItem("app_passcode");
    if (!existingPasscode) {
      navigateTo("password");
    } else {
      await finalizeLoan();
    }
  }, [dispatch, onExitLoanProcess, navigateTo, finalizeLoan]);

  const renderStepContent = () => {
    switch (loanForm.currentStep) {
      case "productcategories":
        return (
          <View style={styles.stepContent}>
            <ProductSelectionGrid
              selectedProduct={loanForm.selectedProduct}
              onSelect={(key) => {
                dispatch(setSelectedProduct(key));
              }}
            />
          </View>
        );
      case "calculator":
        return (
          <View style={styles.stepContent}>
            <LoanCalculatorForm />
          </View>
        );
      case "registration":
        return (
          <RegistrationForm
            registrationFlow={registrationFlow}
            setIsModalVisible={setIsModalVisible}
          />
        );
      case "documents":
        return (
          <DocumentUploadForm
            onSkip={handleSkipDocuments}
            onContinue={handleContinueDocuments}
          />
        );
      case "confirmation":
        return <ConfirmationDetails onDone={handleDone} />;
      default:
        return null;
    }
  };

  const getScreenData = () => {
    switch (loanForm.currentStep) {
      case "productcategories":
        return {
          title: "Select a product",
          subtitle: "Step 1 of 4 • Estimated completion time: 2 min",
        };
      case "calculator":
        return {
          title: "Select amount and period",
          subtitle: "Step 2 of 4 • Estimated completion time: 2 min",
        };
      case "registration":
      case "documents":
        return {
          title: loanForm.currentStep === "registration"
            ? "Fill in the personal data"
            : "Add documents (optional)",
          subtitle: "Step 3 of 4 • Estimated completion time: 2 min",
        };
      default:
        return { title: "", subtitle: "" };
    }
  };

  if (isFinalizing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#00C853" />
        </View>
      </SafeAreaView>
    );
  }

  if (loanForm.currentStep === "confirmation") {
    return <ConfirmationDetails onDone={handleDone} />;
  }

  const { title, subtitle } = getScreenData();
  const displayStep = loanForm.currentStep === "documents" ? "registration" : loanForm.currentStep;
  const showContinueButton = loanForm.currentStep !== "documents";
  
  const isDisabled = isProcessing || isSubmitting || registrationFlow.isProcessing ||
    (loanForm.currentStep === "productcategories" && !loanForm.selectedProduct) ||
    (loanForm.currentStep === "registration" &&
      (!loanForm.userData.firstName.trim() ||
        !loanForm.userData.lastName.trim() ||
        !loanForm.userData.phone.trim() ||
        !loanForm.userData.jmbg.trim() ||
        (!registrationFlow.isAuthenticated && (registrationFlow.password.length < 6 || registrationFlow.password !== registrationFlow.confirmPassword || !registrationFlow.isChecked))));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={handleBack} 
            disabled={isProcessing || registrationFlow.isProcessing}
          >
            <Ionicons name="arrow-back" size={30} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.screenHeader}>
          <Text style={styles.screenTitle}>{title}</Text>
        </View>

        <StepIndicator currentStep={displayStep as "productcategories" | "calculator" | "registration" | "confirmation"} />

        <View style={styles.screenBody}>
          <Text style={styles.screenSubtitle}>{subtitle}</Text>
          {renderStepContent()}
        </View>

        <View style={styles.bottomSpacer} />

        {showContinueButton && (
          <View style={styles.continueButtonWrapper}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                isDisabled && styles.continueButtonDisabled,
              ]}
              onPress={handleNext}
              disabled={isDisabled}
            >
              <Text style={styles.continueButtonText}>
                {isProcessing || isSubmitting || registrationFlow.isProcessing ? "Submitting..." : "Continue"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Private "General Terms of Business"</Text>
            <Text style={styles.modalText}>
              By marking this field when filling out a loan application on the website www.kreddy.ba, which is owned by Microcredit Company "Digital Finance International" d.o.o. Banja Luka, I am fully aware of the "General Terms and Conditions" of Microcredit Company "Digital Finance International" d.o.o. Banja Luka with them and their rights and obligations contained in them.
            </Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

