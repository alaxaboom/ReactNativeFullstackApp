import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../../../../shared/hooks/useAuth';
import { NavigationFunction } from '../../../../shared/types/navigation';

export const useLogin = (navigateTo: NavigationFunction) => {
  const { login, isLoading } = useAuth();
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{phoneOrEmail?: string; password?: string}>({});

  const isValidPhoneOrEmail = (input: string) => {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return phoneRegex.test(input) || emailRegex.test(input);
  };

  const validateInputs = () => {
    const newErrors: {phoneOrEmail?: string; password?: string} = {};
    
    if (!phoneOrEmail.trim()) {
      newErrors.phoneOrEmail = 'Enter phone or email';
    } else if (!isValidPhoneOrEmail(phoneOrEmail)) {
      newErrors.phoneOrEmail = 'Enter valid phone or email';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Enter password';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateInputs()) {
      return;
    }

    const result = await login(phoneOrEmail, password);
    if (!result.success) {
      Alert.alert('Login Error', result.error || 'Invalid credentials');
    }
  };

  const clearError = (field: 'phoneOrEmail' | 'password') => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return {
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
  };
};

