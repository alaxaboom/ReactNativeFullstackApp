import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Location } from '../../../types';

interface LocationDetailProps {
  location: Location;
  onClose: () => void;
  onViewOnMap: () => void;
}

const LocationDetail: React.FC<LocationDetailProps> = ({
  location,
  onClose,
  onViewOnMap,
}) => {
  const handlePhonePress = () => {
    if (location.phone) {
      Linking.openURL(`tel:${location.phone}`);
    }
  };

  const handleWebsitePress = () => {
    if (location.website) {
      const url = location.website.startsWith('http')
        ? location.website
        : `https://${location.website}`;
      Linking.openURL(url);
    }
  };

  const handleEmailPress = () => {
    if (location.mail) {
      Linking.openURL(`mailto:${location.mail}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.name}>{location.name}</Text>
        {location.category && (
          <Text style={styles.category}>{location.category}</Text>
        )}

        <View style={styles.tagContainer}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Cash withdrawal</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.infoRow} activeOpacity={1}>
          <Ionicons name="location-outline" size={20} color="#666" />
          <Text style={styles.infoText}>{location.address}</Text>
          <Ionicons name="chevron-forward" size={16} color="#999" />
        </TouchableOpacity>

        {location.closed_at && (
          <TouchableOpacity style={styles.infoRow} activeOpacity={1}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{location.closed_at}</Text>
            <Ionicons name="chevron-forward" size={16} color="#999" />
          </TouchableOpacity>
        )}

        {location.website && (
          <TouchableOpacity
            style={styles.infoRow}
            onPress={handleWebsitePress}
            activeOpacity={0.7}
          >
            <Ionicons name="globe-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{location.website}</Text>
            <Ionicons name="chevron-forward" size={16} color="#999" />
          </TouchableOpacity>
        )}

        {location.mail && (
          <TouchableOpacity
            style={styles.infoRow}
            onPress={handleEmailPress}
            activeOpacity={0.7}
          >
            <Ionicons name="mail-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{location.mail}</Text>
            <Ionicons name="chevron-forward" size={16} color="#999" />
          </TouchableOpacity>
        )}

        {location.phone && (
          <TouchableOpacity
            style={styles.infoRow}
            onPress={handlePhonePress}
            activeOpacity={0.7}
          >
            <Ionicons name="call-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{location.phone}</Text>
            <Ionicons name="chevron-forward" size={16} color="#999" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.viewOnMapButton}
          onPress={onViewOnMap}
          activeOpacity={0.8}
        >
          <Text style={styles.viewOnMapButtonText}>View on map</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  viewOnMapButton: {
    backgroundColor: '#00C853',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  viewOnMapButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LocationDetail;

