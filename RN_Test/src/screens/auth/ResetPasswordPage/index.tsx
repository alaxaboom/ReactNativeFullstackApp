import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthNavigationProps } from '../types';
import { resetPasswordPageStyles as styles } from './styles';
import { useNavigation } from '../../../contexts/NavigationContext';

type ResetPasswordState =
  | { stage: 'initial'; error?: string }
  | { stage: 'code'; email: string }
  | { stage: 'newPassword' }
  | { stage: 'success' };

const ResetPasswordPage: React.FC<AuthNavigationProps> = () => {
  const { navigateTo } = useNavigation();
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

  const renderInitialStage = () => (
    <View style={styles.formContainer}>
      {'error' in state && state.error && (
        <View style={styles.errorBanner}>
          <Ionicons name="alert-circle" size={16} color="#d32f2f" />
          <Text style={styles.errorText}>User not found</Text>
        </View>
      )}
      
      <Text style={styles.subtitle}>
        We'll email or text you a code to reset your password.
      </Text>

      <TextInput
        style={styles.input}
        value={phoneEmail}
        onChangeText={handlePhoneEmailChange}
        placeholder="Phone or Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="emailAddress"
      />

      <TextInput
        style={styles.input}
        value={jmbg}
        onChangeText={handleJmbgChange}
        placeholder="JMBG"
        keyboardType="numeric"
        maxLength={13}
      />

      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={handleSearchUser}
      >
        <Text style={styles.buttonText}>Reset password</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCodeStage = () => (
    <View style={styles.formContainer}>
      <Text style={styles.subtitle}>
        Enter the code sent to {state.stage === 'code' ? state.email : ''}
      </Text>

      <TextInput
        style={styles.input}
        value={code}
        onChangeText={setCode}
        placeholder="Code"
        keyboardType="numeric"
        maxLength={6}
      />

      <TouchableOpacity style={styles.resendLink}>
        <Text style={styles.resendText}>Didn't get the code? Resend</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={handleVerifyCode}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );

  const renderNewPasswordStage = () => (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="New password"
        secureTextEntry
        textContentType="newPassword"
      />

      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm new password"
        secureTextEntry
        textContentType="newPassword"
      />

      <Text style={styles.passwordRules}>
        {'Password must be at least 8 characters and should include:\n' +
          '• 1 uppercase letter (A-Z)\n' +
          '• 1 lowercase letter (a-z)\n' +
          '• 1 number (0-9)\n' +
          '• 1 special character (-@#$%*<+?=!)'}
      </Text>

      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={handleSetNewPassword}
      >
        <Text style={styles.buttonText}>Reset password</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSuccessStage = () => (
    <View style={styles.successContainer}>
      <View style={styles.checkmarkContainer}>
        <Ionicons name="checkmark" size={24} color="#00C853" />
      </View>
      <Text style={styles.successTitle}>Password changed</Text>
      <Text style={styles.successSubtitle}>
        Your password has been changed successfully.
      </Text>
      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={() => navigateTo('login')}
      >
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigateTo('login')}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reset password</Text>
        </View>

        <View style={styles.content}>
          {state.stage === 'initial' && renderInitialStage()}
          {state.stage === 'code' && renderCodeStage()}
          {state.stage === 'newPassword' && renderNewPasswordStage()}
          {state.stage === 'success' && renderSuccessStage()}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPasswordPage;