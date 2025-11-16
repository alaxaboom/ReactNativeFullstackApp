import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Location } from '../../../../shared/types';

interface LocationItemProps {
  location: Location;
  onPress: (location: Location) => void;
}

export const LocationItem: React.FC<LocationItemProps> = ({ location, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(location)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={styles.name}>{location.name}</Text>
        <Text style={styles.subtitle}>
          {location.category ? `${location.category} · ` : ''}
          {location.address}
        </Text>
        {location.phone && (
          <Text style={styles.phone}>{location.phone}</Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: '#666',
  },
});

