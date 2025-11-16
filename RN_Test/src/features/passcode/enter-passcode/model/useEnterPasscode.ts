import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationFunction } from '../../../../shared/types/navigation';

export const useEnterPasscode = (navigateTo: NavigationFunction) => {
  const [passcode, setPasscode] = useState<string[]>([]);
  const [storedPasscode, setStoredPasscode] = useState<string>('');

  useEffect(() => {
    const loadStoredPasscode = async () => {
      const saved = await AsyncStorage.getItem('app_passcode');
      if (saved) setStoredPasscode(saved);
    };
    loadStoredPasscode();
  }, []);

  const handleNumberPress = (number: string) => {
    if (passcode.length < 4) {
      const newPasscode = [...passcode, number];
      setPasscode(newPasscode);
      if (newPasscode.length === 4) {
        setTimeout(() => handlePasscodeComplete(newPasscode.join('')), 200);
      }
    }
  };

  const handleBackspace = () => {
    if (passcode.length > 0) setPasscode(passcode.slice(0, -1));
  };

  const handlePasscodeComplete = async (code: string) => {
    if (code === storedPasscode) {
      navigateTo('home');
    } else {
      Alert.alert('Error', 'Incorrect passcode');
      setPasscode([]);
    }
  };

  return {
    passcode,
    handleNumberPress,
    handleBackspace,
  };
};




