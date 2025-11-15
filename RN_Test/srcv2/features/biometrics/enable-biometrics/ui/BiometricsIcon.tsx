import React from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const BiometricsIcon: React.FC = () => {
  return (
    <View style={styles.iconContainer}>
      <View style={styles.biometricsIcon}>
        <Ionicons name="finger-print" size={40} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  biometricsIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00C853',
    justifyContent: 'center',
    alignItems: 'center',
  },
});



