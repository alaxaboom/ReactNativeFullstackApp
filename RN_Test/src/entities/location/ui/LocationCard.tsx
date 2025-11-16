import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Location } from '../../../shared/types';

interface LocationCardProps {
  location: Location;
}

export const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{location.name}</Text>
      <Text style={styles.address}>{location.address}</Text>
      {location.phone && <Text style={styles.phone}>{location.phone}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  phone: {
    fontSize: 14,
    color: '#666',
  },
});

