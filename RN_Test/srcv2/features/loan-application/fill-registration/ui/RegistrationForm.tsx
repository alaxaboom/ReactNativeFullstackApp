import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRegistrationForm } from '../model/useRegistrationForm';

interface RegistrationFormProps {
  registrationFlow: {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    confirmPassword: string;
    setConfirmPassword: (password: string) => void;
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
    showConfirmPassword: boolean;
    setShowConfirmPassword: (show: boolean) => void;
    isChecked: boolean;
    setIsChecked: (checked: boolean) => void;
    isAuthenticated: boolean;
  };
  setIsModalVisible: (visible: boolean) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  registrationFlow,
  setIsModalVisible,
}) => {
  const { userData, isAuthenticated, updateUserData } = useRegistrationForm(
    registrationFlow.email,
    registrationFlow.setEmail
  );

  return (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Fill in your contact info</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={userData.firstName}
          onChangeText={(text) => updateUserData({ firstName: text })}
          placeholder="First name"
          editable={!isAuthenticated}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={userData.lastName}
          onChangeText={(text) => updateUserData({ lastName: text })}
          placeholder="Last name"
          editable={!isAuthenticated}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={userData.phone}
          onChangeText={(text) => updateUserData({ phone: text })}
          placeholder="+387 00 000 000"
          editable={!isAuthenticated}
          placeholderTextColor="#999"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={userData.jmbg}
          onChangeText={(text) => updateUserData({ jmbg: text })}
          placeholder="JMBG (13 digits)"
          editable={!isAuthenticated}
          placeholderTextColor="#999"
          keyboardType="numeric"
          maxLength={13}
        />
        <Text style={styles.helperText}>
          13-digit unique citizen identification number
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={registrationFlow.email}
          onChangeText={registrationFlow.setEmail}
          placeholder="Email (optional)"
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isAuthenticated}
          placeholderTextColor="#999"
        />
      </View>

      {!isAuthenticated && (
        <>

          <View style={styles.inputContainer}>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={registrationFlow.password}
                onChangeText={registrationFlow.setPassword}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={!registrationFlow.showPassword}
              />
              <TouchableOpacity onPress={() => registrationFlow.setShowPassword(!registrationFlow.showPassword)}>
                <Ionicons name={registrationFlow.showPassword ? "eye-off" : "eye"} size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={registrationFlow.confirmPassword}
                onChangeText={registrationFlow.setConfirmPassword}
                placeholder="Repeat password"
                placeholderTextColor="#999"
                secureTextEntry={!registrationFlow.showConfirmPassword}
              />
              <TouchableOpacity onPress={() => registrationFlow.setShowConfirmPassword(!registrationFlow.showConfirmPassword)}>
                <Ionicons name={registrationFlow.showConfirmPassword ? "eye-off" : "eye"} size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.checkboxRow}>
            <TouchableOpacity
              style={[styles.checkbox, registrationFlow.isChecked && styles.checkboxChecked]}
              onPress={() => registrationFlow.setIsChecked(!registrationFlow.isChecked)}
            >
              {registrationFlow.isChecked && <Ionicons name="checkmark" size={16} color="white" />}
            </TouchableOpacity>
            <Text style={styles.checkboxText}>
              Accept the{' '}
              <Text
                style={styles.termsLink}
                onPress={() => setIsModalVisible(true)}
              >
                general conditions, data processing, verification of personal data, credit history check, marketing terms.
              </Text>
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  textInput: {
    backgroundColor: '#eeeeee',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  helperText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 4,
  },
  checkboxChecked: {
    backgroundColor: '#00C853',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  termsLink: {
    color: '#00C853',
    textDecorationLine: 'underline',
  },
  submitButton: {
    backgroundColor: '#00C853',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

