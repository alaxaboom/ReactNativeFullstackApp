import { useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationFunction } from '../../../../shared/types/navigation';
import { normalizePhone } from '../../../../shared/utils/phoneUtils';

export const useRegister = (navigateTo: NavigationFunction) => {
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const formatPhone = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.startsWith('387')) {
      const formatted = cleaned.replace(
        /(\d{3})(\d{2})(\d{3})(\d{3})/,
        '+$1 $2 $3 $4'
      );
      return formatted;
    }
    return text;
  };

  const handleRegister = async () => {
    if (!phone.trim() || !firstName.trim() || !lastName.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const cleanPhone = normalizePhone(phone);
    if (cleanPhone.length < 10 || cleanPhone.length > 12) {
      Alert.alert('Error', 'Invalid phone number');
      return;
    }

    const tempData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: cleanPhone,
    };

    await AsyncStorage.setItem('temp_registration', JSON.stringify(tempData));
    navigateTo('otp');
  };

  return {
    phone,
    setPhone: (text: string) => setPhone(formatPhone(text)),
    firstName,
    setFirstName,
    lastName,
    setLastName,
    handleRegister,
  };
};


