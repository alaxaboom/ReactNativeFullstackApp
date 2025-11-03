import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { successScreenStyles } from '../styles';

type SuccessScreenProps = {
  onGotIt: () => void;
};

const SuccessScreen: React.FC<SuccessScreenProps> = ({ onGotIt }) => {
  return (
    <>
      <View style={successScreenStyles.successIcon}>
        <Text style={successScreenStyles.checkmark}>✓</Text>
      </View>
      <Text style={successScreenStyles.successTitle}>Message sent</Text>
      <Text style={successScreenStyles.successSubtitle}>
        Thank you for your interest in the product
      </Text>
      <TouchableOpacity style={successScreenStyles.gotItButton} onPress={onGotIt}>
        <Text style={successScreenStyles.gotItText}>Got it</Text>
      </TouchableOpacity>
    </>
  );
};

export default SuccessScreen;