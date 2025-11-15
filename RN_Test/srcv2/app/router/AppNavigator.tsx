import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppSelector, useAppDispatch } from "../../shared/lib/react-redux/hooks";
import type { NavigationState, Screen, ScreenParams } from "../../shared/types/navigation";
import { resetLoanForm } from "../../entities/loan-application";
import { LoadingScreen } from "../../widgets/loading-screen";
import { useRefreshTokenMutation, useGetMeQuery } from "../../entities/user";
import { initAuth } from "../../processes/auth-init";
import { refreshTokenFlow } from "../../processes/token-refresh";
import { NavigationProvider } from '../providers/NavigationProvider';
import { HomePage } from '../../pages/home';
import { FirstPage } from '../../pages/first-page';
import { PasscodePage } from '../../pages/passcode';
import { LoanApplicationPage } from '../../pages/loan-application';
import { LoginPage } from '../../pages/login';
import { RegisterPage } from '../../pages/register';
import { OTPVerificationPage } from '../../pages/otp-verification';
import { BiometricsPage } from '../../pages/biometrics';
import { PasswordResetPage } from '../../pages/password-reset';
import { LoansListPage } from '../../pages/loans-list';
import { ProfilePage } from '../../pages/profile';
import { HowToPayPage } from '../../pages/how-to-pay';
import { HowToPayExtensionPage } from '../../pages/how-to-pay-extension';
import { LocationsPage } from '../../pages/locations';
import { ContactUsPage } from '../../pages/contact-us';
import { CallMeBackPage } from '../../pages/call-me-back';

const AppNavigator = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [refreshTokenMutation] = useRefreshTokenMutation();
  const { error: userError, refetch: refetchUser } = useGetMeQuery(undefined, {
    skip: !isAuthenticated
  });

  const [navigationState, setNavigationState] = useState<NavigationState | null>(null);
  const [isPasscodeChecked, setIsPasscodeChecked] = useState(false);
  const [passcodeExists, setPasscodeExists] = useState(false);
  const [isCallbackVisible, setIsCallbackVisible] = useState(false);
  const [callbackSourceScreen, setCallbackSourceScreen] = useState<Screen | null>(null);
  const [isInLoanProcess, setIsInLoanProcess] = useState(false);

  const createNavigationState = <T extends Screen>(
    screen: T,
    params: ScreenParams[T] | undefined
  ): NavigationState => {
    return { screen, params: params ?? undefined } as NavigationState;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const refreshToken = async (params: { refreshToken: string }) => {
        const result = await refreshTokenMutation(params).unwrap();
        return { data: result };
      };

      const result = await initAuth(dispatch, refreshToken);
      setPasscodeExists(result.passcodeExists);
      setIsPasscodeChecked(true);
    };
    initializeAuth();
  }, [dispatch, refreshTokenMutation]);

  useEffect(() => {
    if (userError && isAuthenticated) {
      console.log("User fetch failed, attempting token refresh");
      const handleTokenRefresh = async () => {
        const refreshToken = async (params: { refreshToken: string }) => {
          const result = await refreshTokenMutation(params).unwrap();
          return { data: result };
        };

        const result = await refreshTokenFlow(dispatch, refreshToken);
        if (result.success) {
          refetchUser();
        }
      };
      handleTokenRefresh();
    }
  }, [userError, isAuthenticated, refreshTokenMutation, dispatch, refetchUser]);

  useEffect(() => {
    if (isPasscodeChecked && navigationState === null) {
      let initialScreen: Screen;
      if (isInLoanProcess) {
        initialScreen = "loan";
      } else if (isAuthenticated) {
        initialScreen = passcodeExists ? "password" : "home";
      } else {
        initialScreen = "firstpage";
      }
      setNavigationState(createNavigationState(initialScreen, undefined));
    }
  }, [isPasscodeChecked, isAuthenticated, passcodeExists, isInLoanProcess, navigationState]);

  useEffect(() => {
    if (isPasscodeChecked && isAuthenticated && navigationState && navigationState.screen === "login") {
      const targetScreen: Screen = passcodeExists ? "password" : "home";
      setNavigationState(createNavigationState(targetScreen, undefined));
    }
  }, [isAuthenticated, isPasscodeChecked, navigationState, passcodeExists]);

  const navigateTo: import("../../shared/types/navigation").NavigationFunction = (screen, params) => {
    if (screen === "callback") {
      setCallbackSourceScreen(navigationState?.screen ?? null);
      setIsCallbackVisible(true);
      return;
    }

    if (screen === "loan") {
      dispatch(resetLoanForm());
      setIsInLoanProcess(true);
      AsyncStorage.setItem("in_loan_process", "true");
    }

    setNavigationState(createNavigationState(screen, params));
  };

  const handleExitLoanProcess = () => {
    setIsInLoanProcess(false);
    AsyncStorage.removeItem("in_loan_process");
  };

  const handleCallbackClose = () => {
    setIsCallbackVisible(false);
    if (callbackSourceScreen) {
      setNavigationState(createNavigationState(callbackSourceScreen, undefined));
      setCallbackSourceScreen(null);
    } else {
      let fallbackScreen: Screen = isAuthenticated
        ? (passcodeExists ? "password" : "home")
        : "firstpage";
      setNavigationState(createNavigationState(fallbackScreen, undefined));
    }
  };

  if (!isPasscodeChecked || navigationState === null) {
    return <LoadingScreen />;
  }
  
  const { screen, params } = navigationState;

  return (
    <NavigationProvider navigateTo={navigateTo}>
      {screen === "home" && <HomePage isAuthenticated={isAuthenticated} />}
      {screen === "firstpage" && <FirstPage />}
      {screen === "password" && <PasscodePage mode={passcodeExists ? "enter" : "create"} />}
      {screen === "loan" && (
        <LoanApplicationPage
          onExitLoanProcess={handleExitLoanProcess}
          screenParams={params}
        />
      )}
      {screen === "login" && <LoginPage />}
      {screen === "register" && <RegisterPage />}
      {screen === "otp" && <OTPVerificationPage />}
      {screen === "biometrics" && <BiometricsPage />}
      {screen === "resetpassword" && <PasswordResetPage />}
      {screen === "products" && (
        <LoansListPage
          initialTab={params?.tab || "loans"}
        />
      )}
      {screen === "profile" && <ProfilePage />}
      {screen === "howtopay" && <HowToPayPage />}
      {screen === "howtopayextension" && <HowToPayExtensionPage />}
      {screen === "locations" && <LocationsPage />}
      {screen === "contacts" && <ContactUsPage />}
      {screen === "callback" && <FirstPage />}

      {isCallbackVisible && (
        <CallMeBackPage
          visible={isCallbackVisible}
          onClose={handleCallbackClose}
        />
      )}
    </NavigationProvider>
  );
};

export default AppNavigator;

