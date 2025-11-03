// src/screens/auth/LoginPage/index.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../../hooks/useAuth';
import { AuthNavigationProps } from '../types';
import { loginPageStyles as styles } from './styles';
import { useNavigation } from '../../../contexts/NavigationContext';

const LoginPage: React.FC<AuthNavigationProps> = () => {
  const { navigateTo } = useNavigation();
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{phoneOrEmail?: string; password?: string}>({});
  const { login, isLoading } = useAuth();

  const validateInputs = () => {
    const newErrors: {phoneOrEmail?: string; password?: string} = {};
    
    if (!phoneOrEmail.trim()) {
      newErrors.phoneOrEmail = 'Введите телефон или email';
    } else if (!isValidPhoneOrEmail(phoneOrEmail)) {
      newErrors.phoneOrEmail = 'Введите корректный телефон или email';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Введите пароль';
    } else if (password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidPhoneOrEmail = (input: string) => {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return phoneRegex.test(input) || emailRegex.test(input);
  };

  const handleLogin = async () => {
    if (!validateInputs()) {
      return;
    }

    const result = await login(phoneOrEmail, password);
    if (result.success) {
      navigateTo('home');
    } else {
      Alert.alert('Ошибка входа', result.error || 'Неверные учетные данные');
    }
  };

  const handleBack = () => {
    navigateTo('firstpage');
  };

  const handleGoogleLogin = () => {
    Alert.alert('Информация', 'Вход через Google пока не реализован');
  };

  const handleFacebookLogin = () => {
    Alert.alert('Информация', 'Вход через Facebook пока не реализован');
  };

  const clearError = (field: 'phoneOrEmail' | 'password') => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Вход</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
              <Ionicons name="logo-google" size={24} color="#DB4437" />
              <Text style={styles.socialButtonText}>Войти через Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} onPress={handleFacebookLogin}>
              <Ionicons name="logo-facebook" size={24} color="#4267B2" />
              <Text style={styles.socialButtonText}>Войти через Facebook</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.dividerText}>Войти с логином и паролем</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.phoneOrEmail && styles.inputError]}
              value={phoneOrEmail}
              onChangeText={(text) => {
                setPhoneOrEmail(text);
                clearError('phoneOrEmail');
              }}
              placeholder="Телефон или Email"
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
                placeholder="Пароль"
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
              <Text style={styles.loginButtonText}>Войти</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigateTo('resetpassword')}
          >
            <Text style={styles.forgotPasswordText}>Создать или сбросить пароль</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerTextTop}>Нет аккаунта?</Text>
          <Text style={styles.footerTextBottom}>
            <Text
              style={styles.signupLink}
              onPress={() => navigateTo('register')}
            >
              Зарегистрироваться
            </Text>
            {' и получить скидку'}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginPage;