import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

type SuccessScreenProps = {
  onGotIt: () => void;
};

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ onGotIt }) => {
  return (
    <>
      <View style={styles.successIcon}>
        <Text style={styles.checkmark}>✓</Text>
      </View>
      <Text style={styles.successTitle}>Message sent</Text>
      <Text style={styles.successSubtitle}>
        Thank you for your interest in the product
      </Text>
      <TouchableOpacity style={styles.gotItButton} onPress={onGotIt}>
        <Text style={styles.gotItText}>Got it</Text>
      </TouchableOpacity>
    </>
  );
};

