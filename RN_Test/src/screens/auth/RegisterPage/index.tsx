import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthNavigationProps } from '../types';
import { registerPageStyles as styles } from './styles';
import { useNavigation } from '../../../contexts/NavigationContext';

const RegisterPage: React.FC<AuthNavigationProps> = () => {
  const { navigateTo } = useNavigation();
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleRegister = async () => {
    if (!phone.trim() || !firstName.trim() || !lastName.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.whiteContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigateTo('login')}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Sign up</Text>
            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                value={phone}
                onChangeText={(text) => setPhone(formatPhone(text))}
                placeholder="+387 36 576 489"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                maxLength={16}
                selectionColor="#00C853"
              />
              <Text style={styles.inputLabel}>Phone</Text>
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="John"
                placeholderTextColor="#999"
                selectionColor="#00C853"
              />
              <Text style={styles.inputLabel}>First name</Text>
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Doe"
                placeholderTextColor="#999"
                selectionColor="#00C853"
              />
              <Text style={styles.inputLabel}>Last name</Text>
            </View>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
            >
              <Text style={styles.registerButtonText}>Registrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterPage;