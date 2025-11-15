import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useLogin } from '../model/useLogin';
import { NavigationFunction } from '../../../../shared/types/navigation';
import { styles } from './LoginForm.styles';

interface LoginFormProps {
  navigateTo: NavigationFunction;
  onBack: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ navigateTo, onBack }) => {
  const {
    phoneOrEmail,
    setPhoneOrEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    errors,
    isLoading,
    handleLogin,
    clearError,
  } = useLogin(navigateTo);

  const handleGoogleLogin = () => {
    Alert.alert('Info', 'Google login is not implemented yet');
  };

  const handleFacebookLogin = () => {
    Alert.alert('Info', 'Facebook login is not implemented yet');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Login</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
              <Ionicons name="logo-google" size={24} color="#DB4437" />
              <Text style={styles.socialButtonText}>Login with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} onPress={handleFacebookLogin}>
              <Ionicons name="logo-facebook" size={24} color="#4267B2" />
              <Text style={styles.socialButtonText}>Login with Facebook</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.dividerText}>Login with username and password</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.phoneOrEmail && styles.inputError]}
              value={phoneOrEmail}
              onChangeText={(text) => {
                setPhoneOrEmail(text);
                clearError('phoneOrEmail');
              }}
              placeholder="Phone or Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.phoneOrEmail && (
              <Text style={styles.errorText}>{errors.phoneOrEmail}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <View style={[styles.passwordInputWrapper, errors.password && styles.inputError]}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  clearError('password');
                }}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigateTo('resetpassword')}
          >
            <Text style={styles.forgotPasswordText}>Create or reset password</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerTextTop}>Don't have an account?</Text>
          <Text style={styles.footerTextBottom}>
            <Text
              style={styles.signupLink}
              onPress={() => navigateTo('register')}
            >
              Sign up
            </Text>
            {' and get a discount'}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

