import { useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationFunction } from '../../../../shared/types/navigation';

type PasscodeStep = 'create' | 'confirm';

export const useCreatePasscode = (navigateTo: NavigationFunction) => {
  const [passcode, setPasscode] = useState<string[]>([]);
  const [step, setStep] = useState<PasscodeStep>('create');
  const [firstPasscode, setFirstPasscode] = useState<string>('');

  const savePasscode = async (passcode: string): Promise<void> => {
    await AsyncStorage.setItem('app_passcode', passcode);
  };

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
    switch (step) {
      case 'create':
        setFirstPasscode(code);
        setPasscode([]);
        setStep('confirm');
        break;
      case 'confirm':
        if (code === firstPasscode) {
          try {
            await savePasscode(code);
            navigateTo('biometrics');
          } catch {
            Alert.alert('Error', 'Failed to save passcode');
          }
        } else {
          Alert.alert('Error', "Passcodes don't match. Please try again.");
          setPasscode([]);
          setStep('create');
          setFirstPasscode('');
        }
        break;
    }
  };

  const getTitle = (): string => {
    switch (step) {
      case 'create': return 'Create a passcode to quickly enter app';
      case 'confirm': return 'Enter the passcode again';
      default: return 'Passcode';
    }
  };

  const getSubtitle = (): string => {
    switch (step) {
      case 'create': return '';
      case 'confirm': return 'Confirm your new passcode';
      default: return '';
    }
  };

  const currentStepIndex = step === 'create' ? 1 : 2;

  return {
    passcode,
    step,
    title: getTitle(),
    subtitle: getSubtitle(),
    currentStepIndex,
    handleNumberPress,
    handleBackspace,
  };
};


