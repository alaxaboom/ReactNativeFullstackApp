import React, { useState } from 'react';
import { SafeAreaView, StatusBar, TouchableOpacity, Text, View, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Location } from '../../../shared/types';
import { useNavigation } from '../../../shared/lib/react-navigation/hooks';
import { useSmartNavigation } from '../../../shared/utils/smartNavigation';
import { LocationSearchBar } from '../../../features/location/search-locations';
import { LocationMapView, LocationListView } from '../../../features/location/view-location-map';
import { LocationDetail } from '../../../features/location/view-location-details';
import { styles } from './styles';

export const LocationsContent: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { navigateToHomeOrFirst } = useSmartNavigation();
  const [activeTab, setActiveTab] = useState<'map' | 'list'>('map');
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  const handleBack = () => {
    if (isSearching) {
      setIsSearching(false);
      setSearchQuery('');
    } else {
      navigateToHomeOrFirst(navigateTo);
    }
  };

  const handleSearchIconPress = () => {
    setIsSearching(true);
  };

  const handleLocationPress = (location: Location) => {
    setSelectedLocation(location);
    setIsDetailVisible(true);
  };

  const handleCloseDetail = () => {
    setIsDetailVisible(false);
    setSelectedLocation(null);
  };

  const handleViewOnMap = () => {
    setIsDetailVisible(false);
    setActiveTab('map');
    setSelectedLocation(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {isSearching ? (
        <LocationSearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onBack={handleBack}
          placeholder="Search..."
        />
      ) : (
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Locations</Text>
          <TouchableOpacity onPress={handleSearchIconPress} style={styles.searchIcon}>
            <Ionicons name="search" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'map' && styles.activeTab]}
          onPress={() => setActiveTab('map')}
        >
          <Text style={[styles.tabText, activeTab === 'map' && styles.activeTabText]}>
            Map
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'list' && styles.activeTab]}
          onPress={() => setActiveTab('list')}
        >
          <Text style={[styles.tabText, activeTab === 'list' && styles.activeTabText]}>
            List
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'map' ? (
        <LocationMapView searchQuery={searchQuery} onMarkerPress={handleLocationPress} />
      ) : (
        <LocationListView searchQuery={searchQuery} onLocationPress={handleLocationPress} />
      )}

      <Modal
        visible={isDetailVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCloseDetail}
      >
        {selectedLocation && (
          <LocationDetail
            location={selectedLocation}
            onClose={handleCloseDetail}
            onViewOnMap={handleViewOnMap}
          />
        )}
      </Modal>
    </SafeAreaView>
  );
};

