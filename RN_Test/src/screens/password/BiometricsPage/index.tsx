import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Alert, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { containerStyles as styles } from './styles';
import BiometricsIcon from './components/BiometricsIcon';
import TitleSection from './components/TitleSection';
import ActionButtons from './components/ActionButtons';
import { enableBiometrics, disableBiometrics } from './service/biometricsService';
import { BiometricsPageProps } from './types';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigation } from '../../../contexts/NavigationContext';

const BiometricsPage: React.FC<BiometricsPageProps> = () => {
  const { navigateTo } = useNavigation();
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <View style={styles.whiteCard}>
        <BiometricsIcon />
        <TitleSection />
        <ActionButtons
          isLoading={isLoading}
          onUseBiometrics={handleUseBiometrics}
          onSkip={handleSkip}
        />
      </View>
    </SafeAreaView>
  );
};

export default BiometricsPage;