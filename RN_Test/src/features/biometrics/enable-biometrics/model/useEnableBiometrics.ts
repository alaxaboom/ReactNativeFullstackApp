import { useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationFunction } from '../../../../shared/types/navigation';
import { enableBiometrics, disableBiometrics } from './biometricsService';
import { useAuth } from '../../../../shared/hooks/useAuth';

export const useEnableBiometrics = (navigateTo: NavigationFunction) => {
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useAuth();

  const handleFinalNavigation = async () => {
    try {
      const pending = await AsyncStorage.getItem("loan_pending");
      if (pending) {
        const { user } = JSON.parse(pending);
        await loginUser(user);
        await AsyncStorage.removeItem("loan_pending");
      }
      navigateTo('home');
    } catch (error) {
      console.error('Error handling final navigation:', error);
      navigateTo('home');
    }
  };

  const handleUseBiometrics = async () => {
    setIsLoading(true);
    try {
      await enableBiometrics();
      setTimeout(() => {
        setIsLoading(false);
        Alert.alert(
          'Biometrics Setup',
          'You can now use biometric authentication to log into the app',
          [{ text: 'OK', onPress: handleFinalNavigation }]
        );
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to setup biometrics');
    }
  };

  const handleSkip = async () => {
    try {
      await disableBiometrics();
      handleFinalNavigation();
    } catch (error) {
      console.error('Error saving biometrics preference:', error);
      handleFinalNavigation();
    }
  };

  return {
    isLoading,
    handleUseBiometrics,
    handleSkip,
  };
};




