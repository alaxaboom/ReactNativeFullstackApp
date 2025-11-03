import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { actionButtonsStyles as styles } from '../styles';

interface ActionButtonsProps {
  isLoading: boolean;
  onUseBiometrics: () => void;
  onSkip: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isLoading,
  onUseBiometrics,
  onSkip,
}) => {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        style={[styles.primaryButton, isLoading && styles.buttonDisabled]}
        onPress={onUseBiometrics}
        disabled={isLoading}
      >
        <Text style={styles.primaryButtonText}>
          {isLoading ? 'Setting up...' : 'Use Bio Metrics'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.skipButton}
        onPress={onSkip}
        disabled={isLoading}
      >
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionButtons;