import React from 'react';
import { View, Text } from 'react-native';
import { mapViewStyles as styles } from '../styles';

const MapView: React.FC = () => {
  return (
    <View style={styles.mapContainer}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.placeholderText}>Interactive map will be here</Text>
        <Text style={styles.placeholderSubtext}>Currently under development</Text>
      </View>
    </View>
  );
};

export default MapView;