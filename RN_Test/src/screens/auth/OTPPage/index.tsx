import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthNavigationProps } from '../types';
import { otpPageStyles as styles } from './styles';
import { useNavigation } from '../../../contexts/NavigationContext';

const OTPPage: React.FC<AuthNavigationProps> = () => {
  const { navigateTo } = useNavigation();
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

  const renderOTPInput = () => {
    return (
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <View key={index} style={styles.otpBox}>
            <Text style={styles.otpText}>{digit}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderKeyboard = () => {
    let numbers: string[];

    if (isSpecialMode) {
      numbers = ['*', '0', '#'];
    } else {
      numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    }

    return (
      <View style={styles.keyboard}>
        {numbers.map((num, index) => (
          <TouchableOpacity
            key={index}
            style={styles.keyboardButton}
            onPress={() => {
              if (isSpecialMode) {
                if (num === '*') {
                  handleBackspace();
                } else if (num === '#') {
                } else {
                  handleNumberPress(num);
                }
              } else {
                handleNumberPress(num);
              }
            }}
          >
            <Text style={styles.keyboardButtonText}>
              {isSpecialMode && num === '*' ? '⌫' : num}
            </Text>
            {!isSpecialMode && num === '2' && <Text style={styles.keyboardSubText}>ABC</Text>}
            {!isSpecialMode && num === '3' && <Text style={styles.keyboardSubText}>DEF</Text>}
            {!isSpecialMode && num === '4' && <Text style={styles.keyboardSubText}>GHI</Text>}
            {!isSpecialMode && num === '5' && <Text style={styles.keyboardSubText}>JKL</Text>}
            {!isSpecialMode && num === '6' && <Text style={styles.keyboardSubText}>MNO</Text>}
            {!isSpecialMode && num === '7' && <Text style={styles.keyboardSubText}>PQRS</Text>}
            {!isSpecialMode && num === '8' && <Text style={styles.keyboardSubText}>TUV</Text>}
            {!isSpecialMode && num === '9' && <Text style={styles.keyboardSubText}>WXYZ</Text>}
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.keyboardButton}
          onPress={() => setIsSpecialMode(!isSpecialMode)}
        >
          <Text style={styles.keyboardButtonText}>+ * #</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.keyboardButton}
          onPress={() => handleNumberPress('0')}
        >
          <Text style={styles.keyboardButtonText}>0</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.keyboardButton}
          onPress={handleBackspace}
        >
          <Text style={styles.keyboardButtonText}>⌫</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.whiteContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigateTo('register')}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.titleSection}>
            <Text style={styles.title}>Enter the sms code</Text>
            <Text style={styles.subtitle}>
              Enter the code sent to{'\n'}
              {displayPhone || 'your phone'}
            </Text>
          </View>

          {renderOTPInput()}

          <View>
            {canResend ? (
              <TouchableOpacity onPress={handleResendCode}>
                <Text>Send again</Text>
              </TouchableOpacity>
            ) : (
              `Send again in ${formatTime(timer)}`
            )}
          </View>
        </View>

        <View style={styles.keyboardSpacer} />
        {renderKeyboard()}
      </View>
    </SafeAreaView>
  );
};

export default OTPPage;