import React from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { usePasswordReset } from '../model/usePasswordReset';
import { NavigationFunction } from '../../../../shared/types/navigation';
import { styles } from './PasswordResetForm.styles';

interface PasswordResetFormProps {
  navigateTo: NavigationFunction;
  onBack: () => void;
}

export const PasswordResetForm: React.FC<PasswordResetFormProps> = ({ navigateTo, onBack }) => {
  const {
    state,
    phoneEmail,
    setPhoneEmail,
    jmbg,
    setJmbg,
    code,
    setCode,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleSearchUser,
    handleVerifyCode,
    handleSetNewPassword,
  } = usePasswordReset(navigateTo);

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
        onChangeText={setPhoneEmail}
        placeholder="Phone or Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="emailAddress"
      />

      <TextInput
        style={styles.input}
        value={jmbg}
        onChangeText={setJmbg}
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
            onPress={onBack}
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


