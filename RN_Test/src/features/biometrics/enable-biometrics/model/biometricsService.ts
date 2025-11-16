import AsyncStorage from '@react-native-async-storage/async-storage';

export const enableBiometrics = async (): Promise<void> => {
  await AsyncStorage.setItem('biometrics_enabled', 'true');
};

export const disableBiometrics = async (): Promise<void> => {
  await AsyncStorage.setItem('biometrics_enabled', 'false');
};




