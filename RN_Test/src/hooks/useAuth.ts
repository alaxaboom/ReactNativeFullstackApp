import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLoginUserMutation, useRegisterUserMutation, useGetMeQuery, useRefreshTokenMutation } from '../store/api';
import { setCredentials, setUser, logout, setLoading } from '../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState, resetApiCache } from '../store/store';
import { User, RegisterData, AuthResult } from '../types';
import { extractErrorMessage } from '../utils/errorUtils';

export const useAuth = () => {
  const dispatch = useDispatch();
  const [loginUserMutation, { isLoading: isLoginLoading }] = useLoginUserMutation();
  const [registerUser, { isLoading: isRegisterLoading }] = useRegisterUserMutation();
  const [refreshToken] = useRefreshTokenMutation();
  
  const { isLoading: authIsLoading, isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const { data: user, refetch: refetchUser } = useGetMeQuery(undefined, {
    skip: !isAuthenticated
  });

  const login = async (phoneOrEmail: string, password: string): Promise<AuthResult> => {
    try {
      dispatch(setLoading(true));
      resetApiCache();
      const result = await loginUserMutation({ phoneOrEmail, password }).unwrap();
      dispatch(setCredentials(result));
      await AsyncStorage.setItem('accessToken', result.accessToken);
      await AsyncStorage.setItem('refreshToken', result.refreshToken);
      return { success: true, user: result.user };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: extractErrorMessage(error)
      };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const register = async (userData: RegisterData): Promise<AuthResult> => {
    try {
      dispatch(setLoading(true));
      const result = await registerUser(userData).unwrap();
      dispatch(setCredentials(result));
      await AsyncStorage.setItem('accessToken', result.accessToken);
      await AsyncStorage.setItem('refreshToken', result.refreshToken);
      return { success: true, user: result.user };
    } catch (error) {
      console.error('Register error:', error);
      return { 
        success: false, 
        error: extractErrorMessage(error)
      };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const createUserOnly = async (userData: RegisterData): Promise<AuthResult> => {
    try {
      dispatch(setLoading(true));
      const result = await registerUser(userData).unwrap();
      return { success: true, user: result.user };
    } catch (error) {
      console.error('Create user error:', error);
      return { 
        success: false, 
        error: extractErrorMessage(error)
      };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const loginUserDirectly = async (user: User & { password: string }): Promise<AuthResult> => {
    try {
      resetApiCache();
      const loginResult = await loginUserMutation({ 
        phoneOrEmail: user.phone || user.email || '', 
        password: user.password 
      }).unwrap();
      
      dispatch(setCredentials(loginResult));
      await AsyncStorage.setItem('accessToken', loginResult.accessToken);
      await AsyncStorage.setItem('refreshToken', loginResult.refreshToken);
      
      dispatch(setUser(loginResult.user));
      
      return { success: true, user: loginResult.user };
    } catch (error) {
      console.error('Login user error:', error);
      return { 
        success: false, 
        error: extractErrorMessage(error)
      };
    }
  };

  const logoutUser = async () => {
    dispatch(logout());
    resetApiCache();
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
  };

  const refreshAuthToken = async (): Promise<void> => {
    try {
      const refreshTokenValue = await AsyncStorage.getItem('refreshToken');
      if (refreshTokenValue) {
        const result = await refreshToken({ refreshToken: refreshTokenValue }).unwrap();
        await AsyncStorage.setItem('accessToken', result.accessToken);
        await AsyncStorage.setItem('refreshToken', result.refreshToken);
      }
    } catch (error) {
      await logoutUser();
      throw error;
    }
  };

  useEffect(() => {
    if (user && isAuthenticated) {
      dispatch(setUser(user));
    }
  }, [user, isAuthenticated, dispatch]);

  return {
    login,
    register,
    createUserOnly,
    loginUser: loginUserDirectly,
    logout: logoutUser,
    refreshToken: refreshAuthToken,
    user,
    refetchUser,
    isAuthenticated,
    isLoading: authIsLoading || isLoginLoading || isRegisterLoading,
  };
};