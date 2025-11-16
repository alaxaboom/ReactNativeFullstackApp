import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRegister } from '../model/useRegister';
import { NavigationFunction } from '../../../../shared/types/navigation';
import { styles } from './RegisterForm.styles';

interface RegisterFormProps {
  navigateTo: NavigationFunction;
  onBack: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ navigateTo, onBack }) => {
  const {
    phone,
    setPhone,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    handleRegister,
  } = useRegister(navigateTo);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.whiteContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={onBack}
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
                onChangeText={setPhone}
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


