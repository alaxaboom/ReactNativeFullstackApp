import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ViewToggleProps {
  activeView: 'map' | 'list';
  onViewChange: (view: 'map' | 'list') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ activeView, onViewChange }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, activeView === 'map' && styles.activeButton]}
        onPress={() => onViewChange('map')}
      >
        <Text style={[styles.buttonText, activeView === 'map' && styles.activeButtonText]}>
          Map
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, activeView === 'list' && styles.activeButton]}
        onPress={() => onViewChange('list')}
      >
        <Text style={[styles.buttonText, activeView === 'list' && styles.activeButtonText]}>
          List
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeButtonText: {
    color: '#333',
    fontWeight: '600',
  },
});

