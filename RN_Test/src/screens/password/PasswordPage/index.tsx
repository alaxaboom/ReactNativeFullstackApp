import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, Alert, Text, View } from 'react-native';
import { containerStyles as containerStyles } from './styles';
import TitleSection from './components/TitleSection';
import PasscodeInput from './components/PasscodeInput';
import PasscodeKeyboard from './components/PasscodeKeyboard';
import { helperTextStyles } from './styles';
import {
  savePasscode,
  loadPasscode,
  checkLoanPending,
} from './service/passwordService';
import { PasswordPageProps, PasswordMode } from './types';
import { useNavigation } from '../../../contexts/NavigationContext';

type PasswordStep = 'create' | 'confirm' | 'enter';

const PasswordPage: React.FC<PasswordPageProps> = ({ mode = 'create' }) => {
  const { navigateTo } = useNavigation();
  const [passcode, setPasscode] = useState<string[]>([]);
  const [step, setStep] = useState<PasswordStep>(mode === 'create' ? 'create' : 'enter');
  const [firstPasscode, setFirstPasscode] = useState<string>('');
  const [storedPasscode, setStoredPasscode] = useState<string>('');

  useEffect(() => {
    const loadStoredPasscode = async () => {
      const saved = await loadPasscode();
      if (saved) setStoredPasscode(saved);
    };

    if (mode === 'enter') loadStoredPasscode();
  }, [mode]);

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
            Alert.alert('Error', 'Failed to save password');
          }
        } else {
          Alert.alert('Error', "Passwords don't match. Please try again.");
          setPasscode([]);
          setStep('create');
          setFirstPasscode('');
        }
        break;
      case 'enter':
        if (code === storedPasscode) {
          navigateTo('home');
        } else {
          Alert.alert('Error', 'Incorrect password');
          setPasscode([]);
        }
        break;
    }
  };

  const getTitle = (): string => {
    switch (step) {
      case 'create': return 'Create a passcode to quickly enter app';
      case 'confirm': return 'Enter the passcode again';
      case 'enter': return 'Enter passcode';
      default: return 'Passcode';
    }
  };

  const getSubtitle = (): string => {
    switch (step) {
      case 'create': return '';
      case 'confirm': return 'Confirm your new passcode';
      case 'enter': return 'Enter your passcode to continue';
      default: return '';
    }
  };

  const currentStepIndex = step === 'create' ? 1 : step === 'confirm' ? 2 : 0;

  return (
    <SafeAreaView style={containerStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <View style={containerStyles.whiteCard}>
        <TitleSection title={getTitle()} subtitle={getSubtitle()} />
        <PasscodeInput passcode={passcode} />
        {step === 'confirm' && (
          <Text style={helperTextStyles.helperText}>
            Re-enter the passcode you just created
          </Text>
        )}
      </View>
      <PasscodeKeyboard onNumberPress={handleNumberPress} onBackspace={handleBackspace} />
    </SafeAreaView>
  );
};

export default PasswordPage;