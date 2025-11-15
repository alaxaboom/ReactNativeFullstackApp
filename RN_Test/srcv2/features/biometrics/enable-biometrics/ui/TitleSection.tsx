import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const TitleSection: React.FC = () => {
  return (
    <View style={styles.titleSection}>
      <Text style={styles.title}>Enable Biometric Authentication</Text>
      <Text style={styles.subtitle}>
        Use your fingerprint or face ID to quickly and securely access your account
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});



