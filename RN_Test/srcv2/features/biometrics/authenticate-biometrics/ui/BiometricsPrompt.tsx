import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationFunction } from '../../../../shared/types/navigation';

interface BiometricsPromptProps {
  navigateTo: NavigationFunction;
  onSuccess: () => void;
  onFailure: () => void;
}

export const BiometricsPrompt: React.FC<BiometricsPromptProps> = ({
  navigateTo,
  onSuccess,
  onFailure,
}) => {
  useEffect(() => {
    // Biometric authentication logic will be implemented here
    // For now, just call onSuccess after a delay
    const timer = setTimeout(() => {
      onSuccess();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onSuccess]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Authenticating with biometrics...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
});



