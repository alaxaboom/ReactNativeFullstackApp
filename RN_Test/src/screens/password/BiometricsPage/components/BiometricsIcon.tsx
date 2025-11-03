import React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { biometricsIconStyles as styles } from '../styles';

const BiometricsIcon: React.FC = () => {
  return (
    <View style={styles.iconContainer}>
      <View style={styles.biometricsIcon}>
        <Ionicons name="finger-print" size={40} color="white" />
      </View>
    </View>
  );
};

export default BiometricsIcon;