import React from 'react';
import { View, Text } from 'react-native';
import { listViewStyles as styles } from '../styles';

const ListView: React.FC = () => {
  return (
    <View style={styles.listContainer}>
      <Text style={styles.listPlaceholderText}>List of locations will appear here</Text>
      <Text style={styles.listPlaceholderSubtext}>Awaiting backend integration</Text>
    </View>
  );
};

export default ListView;