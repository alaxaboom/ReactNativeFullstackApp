import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppSelector, useAppDispatch } from "../store/store";
import type {
  NavigationState,
  NavigationFunction,
  Screen,
  ScreenParams,
} from "../types";
import {
  HomePage,
  LoanPage,
  LoginPage,
  RegisterPage,
  OTPPage,
  PasswordPage,
  BiometricsPage,
  ResetPasswordPage,
  ProductsListPage,
  ProfilePage,
  FirstPage,
  CallMeBackPage,
  HowToPayPage,
  ContactUsPage,
  LocationPage,
  HowToPayExtensionPage
} from "../screens";
import { resetLoanForm } from "../store/loanSlice";
import { LoadingScreen } from "../components/LoadingScreen";
import { setCredentials, logout, updateTokens } from "../store/authSlice";
import { useGetMeQuery, useRefreshTokenMutation } from "../store/api";
import { NavigationProvider } from '../contexts/NavigationContext';
const AppNavigator = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [refreshToken] = useRefreshTokenMutation();
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
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshTokenValue = await AsyncStorage.getItem('refreshToken');
        
        if (accessToken && refreshTokenValue) {
          dispatch(setCredentials({ 
            accessToken, 
            refreshToken: refreshTokenValue, 
            user: null 
          }));
          
          try {
            const newTokens = await refreshToken({ refreshToken: refreshTokenValue }).unwrap();
            await AsyncStorage.setItem('accessToken', newTokens.accessToken);
            await AsyncStorage.setItem('refreshToken', newTokens.refreshToken);
            dispatch(updateTokens({ 
              accessToken: newTokens.accessToken, 
              refreshToken: newTokens.refreshToken
            }));
          } catch (refreshError) {
            console.log("Token refresh failed, logging out");
            dispatch(logout());
            await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
          }
        }
        
        const passcode = await AsyncStorage.getItem("app_passcode");
        setPasscodeExists(!!passcode);
      } catch (error) {
        console.error("Auth initialization error:", error);
        setPasscodeExists(false);
      } finally {
        setIsPasscodeChecked(true);
      }
    };
    initializeAuth();
  }, [dispatch, refreshToken]);

  useEffect(() => {
    if (userError && isAuthenticated) {
      console.log("User fetch failed, attempting token refresh");
      const handleTokenRefresh = async () => {
        try {
          const refreshTokenValue = await AsyncStorage.getItem('refreshToken');
          if (refreshTokenValue) {
            const newTokens = await refreshToken({ refreshToken: refreshTokenValue }).unwrap();
            await AsyncStorage.setItem('accessToken', newTokens.accessToken);
            await AsyncStorage.setItem('refreshToken', newTokens.refreshToken);
            dispatch(updateTokens({ 
              accessToken: newTokens.accessToken, 
              refreshToken: newTokens.refreshToken
            }));
            refetchUser();
          }
        } catch (error) {
          console.log("Token refresh failed, logging out");
          dispatch(logout());
          await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
        }
      };
      handleTokenRefresh();
    }
  }, [userError, isAuthenticated, refreshToken, dispatch, refetchUser]);

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

  const navigateTo: NavigationFunction = (screen, params) => {
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
      {screen === "password" && <PasswordPage mode={passcodeExists ? "enter" : "create"} />}
      {screen === "loan" && (
        <LoanPage
          onExitLoanProcess={handleExitLoanProcess}
          screenParams={params}
        />
      )}
      {screen === "login" && <LoginPage />}
      {screen === "register" && <RegisterPage />}
      {screen === "otp" && <OTPPage />}
      {screen === "biometrics" && <BiometricsPage />}
      {screen === "resetpassword" && <ResetPasswordPage />}
      {screen === "products" && (
        <ProductsListPage
          initialTab={params?.tab || "loans"}
        />
      )}
      {screen === "profile" && <ProfilePage />}
      {screen === "howtopay" && <HowToPayPage />}
      {screen === "howtopayextension" && <HowToPayExtensionPage />}
      {screen === "locations" && <LocationPage />}
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