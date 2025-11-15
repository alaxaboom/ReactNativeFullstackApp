import { useState } from 'react';
import { Alert } from 'react-native';
import { NavigationFunction } from '../../../../shared/types/navigation';
import { normalizePhone } from '../../../../shared/utils/phoneUtils';

type ResetPasswordState =
  | { stage: 'initial'; error?: string }
  | { stage: 'code'; email: string }
  | { stage: 'newPassword' }
  | { stage: 'success' };

export const usePasswordReset = (navigateTo: NavigationFunction) => {
  const [state, setState] = useState<ResetPasswordState>({ stage: 'initial' });
  const [phoneEmail, setPhoneEmail] = useState('');
  const [jmbg, setJmbg] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const formatJmbg = (text: string) => {
    const numbers = text.replace(/\D/g, '');
    return numbers.slice(0, 13);
  };

  const formatPhone = (text: string) => {
    const numbers = text.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6)
      return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
    if (numbers.length <= 9) {
      return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6)}`;
    }
    return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 9)}`;
  };

  const handlePhoneEmailChange = (text: string) => {
    if (text.includes('@')) {
      setPhoneEmail(text);
    } else {
      const formatted = formatPhone(text);
      setPhoneEmail(formatted);
    }
  };

  const handleJmbgChange = (text: string) => {
    const formatted = formatJmbg(text);
    setJmbg(formatted);
  };

  const handleSearchUser = () => {
    if (!phoneEmail.trim() || !jmbg.trim()) {
      setState({ stage: 'initial', error: 'User not found' });
      return;
    }

    if (jmbg.length !== 13) {
      setState({ stage: 'initial', error: 'User not found' });
      return;
    }

    setState({ stage: 'code', email: phoneEmail });
  };

  const handleVerifyCode = () => {
    if (code.length < 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit code');
      return;
    }
    setState({ stage: 'newPassword' });
  };

  const handleSetNewPassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }

    setState({ stage: 'success' });
  };

  return {
    state,
    phoneEmail,
    setPhoneEmail: handlePhoneEmailChange,
    jmbg,
    setJmbg: handleJmbgChange,
    code,
    setCode,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleSearchUser,
    handleVerifyCode,
    handleSetNewPassword,
  };
};


