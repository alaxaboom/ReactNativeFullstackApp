import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
  View,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView from './components/MapView';
import ListView from './components/ListView';
import SearchBar from './components/SearchBar';
import LocationDetail from './components/LocationDetail';
import { locationPageStyles as styles } from './styles';
import { LocationPageProps } from './types';
import { useSmartNavigation } from '../../utils/smartNavigation';
import { useNavigation } from '../../contexts/NavigationContext';
import { Location } from '../../types';

const LocationPage: React.FC<LocationPageProps> = () => {
  const { navigateTo } = useNavigation();
  const [activeTab, setActiveTab] = useState<'map' | 'list'>('map');
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const { navigateToHomeOrFirst } = useSmartNavigation();

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
        <SearchBar
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
        <MapView searchQuery={searchQuery} onMarkerPress={handleLocationPress} />
      ) : (
        <ListView searchQuery={searchQuery} onLocationPress={handleLocationPress} />
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

export default LocationPage;
