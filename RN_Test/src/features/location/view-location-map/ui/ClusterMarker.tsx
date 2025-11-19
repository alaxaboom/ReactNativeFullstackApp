import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ClusterMarkerProps {
  cluster: {
    id: number;
    geometry: {
      coordinates: [number, number];
    };
    properties: {
      point_count: number;
    };
  };
  onPress: () => void;
}

export const ClusterMarker: React.FC<ClusterMarkerProps> = ({ cluster, onPress }) => {
  const pointCount = cluster.properties.point_count;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.container}>
        <View style={styles.marker}>
          <Text style={styles.text}>{pointCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00C853',
    borderWidth: 3,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});


