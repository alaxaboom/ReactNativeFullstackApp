import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View, StyleSheet } from 'react-native';

interface ActionButtonsProps {
  isLoading: boolean;
  onUseBiometrics: () => void;
  onSkip: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  isLoading,
  onUseBiometrics,
  onSkip,
}) => {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        style={[styles.button, styles.primaryButton, isLoading && styles.buttonDisabled]}
        onPress={onUseBiometrics}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.buttonText}>Use Biometrics</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={onSkip}
        disabled={isLoading}
      >
        <Text style={styles.secondaryButtonText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#00C853',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});



