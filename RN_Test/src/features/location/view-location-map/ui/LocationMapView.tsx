import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Location } from '../../../../shared/types';

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

interface LocationMapViewProps {
  searchQuery?: string;
  onMarkerPress: (location: Location) => void;
  initialRegion?: Region;
}

export const LocationMapView: React.FC<LocationMapViewProps> = ({
  searchQuery = '',
  onMarkerPress,
  initialRegion,
}) => {
  const mapRef = useRef<any>(null);
  const [region] = useState<Region>(
    initialRegion || {
      latitude: 43.8563,
      longitude: 18.4131,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    }
  );

  const locations: Location[] = [];
  const isLoading = false;
  const hasError = false;

  return (
    <View style={styles.container}>
      <View style={styles.emptyContainer}>
        <Text style={styles.placeholderText}>Interactive map will be here</Text>
        <Text style={styles.placeholderSubtext}>Currently under development</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#999',
  },
});

