import AsyncStorage from '@react-native-async-storage/async-storage';

export const savePasscode = async (passcode: string): Promise<void> => {
  await AsyncStorage.setItem('app_passcode', passcode);
};

export const loadPasscode = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('app_passcode');
};

export const checkLoanPending = async (): Promise<boolean> => {
  const pending = await AsyncStorage.getItem('loan_pending');
  return !!pending;
};