import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationFunction } from '../../../../shared/types/navigation';

export const useOTPVerification = (navigateTo: NavigationFunction) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(115);
  const [canResend, setCanResend] = useState(false);
  const [isSpecialMode, setIsSpecialMode] = useState(false);
  const [displayPhone, setDisplayPhone] = useState<string | null>(null);

  useEffect(() => {
    const loadTempData = async () => {
      const raw = await AsyncStorage.getItem('temp_registration');
      if (raw) {
        const data = JSON.parse(raw);
        const formatted = `+${data.phone.replace(/(\d{3})(\d{2})(\d{3})(\d{3})/, '$1 $2 $3 $4')}`;
        setDisplayPhone(formatted);
      }
    };
    loadTempData();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNumberPress = (number: string): void => {
    const emptyIndex = otp.findIndex((digit) => digit === '');
    if (emptyIndex !== -1) {
      const newOtp = [...otp];
      newOtp[emptyIndex] = number;
      setOtp(newOtp);

      if (emptyIndex === 3) {
        setTimeout(() => {
          verifyOTP(newOtp);
        }, 300);
      }
    }
  };

  const handleBackspace = (): void => {
    const lastFilledIndex = otp
      .map((digit, index) => (digit !== '' ? index : -1))
      .filter((index) => index !== -1)
      .pop();

    if (lastFilledIndex !== undefined) {
      const newOtp = [...otp];
      newOtp[lastFilledIndex] = '';
      setOtp(newOtp);
    }
  };

  const verifyOTP = async (code: string[]): Promise<void> => {
    const enteredCode = code.join('');

    if (enteredCode.length === 4) {
      await AsyncStorage.removeItem('temp_registration');
      Alert.alert('Code Verified', 'SMS code successfully verified!', [
        { text: 'OK', onPress: () => navigateTo('loan') },
      ]);
    } else {
      Alert.alert('Error', 'Invalid code');
      setOtp(['', '', '', '']);
    }
  };

  const handleResendCode = (): void => {
    if (canResend) {
      setTimer(115);
      setCanResend(false);
      setOtp(['', '', '', '']);
      Alert.alert('Code Sent', 'New SMS code sent to your number');
    }
  };

  return {
    otp,
    timer,
    canResend,
    isSpecialMode,
    setIsSpecialMode,
    displayPhone,
    formatTime,
    handleNumberPress,
    handleBackspace,
    handleResendCode,
  };
};


