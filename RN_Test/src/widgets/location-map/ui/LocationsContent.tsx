import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, StatusBar, TouchableOpacity, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Location } from '../../../shared/types';
import { useNavigation } from '../../../shared/lib/react-navigation/hooks';
import { useSmartNavigation } from '../../../shared/utils/smartNavigation';
import { LocationSearchBar } from '../../../features/location/search-locations';
import { LocationMapView, LocationMapViewRef, LocationListView } from '../../../features/location/view-location-map';
import { LocationDetail } from '../../../features/location/view-location-details';
import { ViewToggle } from './ViewToggle';
import { styles } from './styles';

export const LocationsContent: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { navigateToHomeOrFirst } = useSmartNavigation();
  const mapViewRef = useRef<LocationMapViewRef>(null);
  const [activeTab, setActiveTab] = useState<'map' | 'list'>('map');
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const locationToAnimateRef = useRef<Location | null>(null);

  const handleBack = () => {
    if (showDetail && selectedLocation) {
      setShowDetail(false);
      setSelectedLocation(null);
      return;
    }
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
    setShowDetail(true);
  };

  const handleViewOnMap = () => {
    if (selectedLocation) {
      locationToAnimateRef.current = selectedLocation;
      setShowDetail(false);
      setActiveTab('map');
      setSelectedLocation(null);
    }
  };

  useEffect(() => {
    if (activeTab === 'map' && locationToAnimateRef.current && mapViewRef.current) {
      const timer = setTimeout(() => {
        if (mapViewRef.current && locationToAnimateRef.current) {
          mapViewRef.current.animateToLocation(locationToAnimateRef.current);
          locationToAnimateRef.current = null;
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  if (showDetail && selectedLocation) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
        <LocationDetail
          location={selectedLocation}
          onClose={handleBack}
          onViewOnMap={handleViewOnMap}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      {isSearching ? (
        <View style={styles.searchContainer}>
          <LocationSearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onBack={handleBack}
            placeholder="Search..."
          />
        </View>
      ) : (
        <>
          <View style={styles.headerContainer}>
            <View style={styles.backButtonWrapper}>
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <View style={styles.titleRow}>
              <Text style={styles.title}>Locations</Text>
              <TouchableOpacity onPress={handleSearchIconPress} style={styles.searchIcon}>
                <Ionicons name="search" size={24} color="#333" />
              </TouchableOpacity>
            </View>
          </View>
          {activeTab === 'map' ? (
            <View style={styles.mapWrapper}>
              <View style={styles.toggleContainer}>
                <ViewToggle activeView={activeTab} onViewChange={setActiveTab} />
              </View>
              <View style={styles.mapContainer}>
                <LocationMapView 
                  ref={mapViewRef}
                  searchQuery={searchQuery} 
                  onMarkerPress={handleLocationPress} 
                />
              </View>
            </View>
          ) : (
            <View style={styles.contentContainer}>
              <View style={styles.toggleContainer}>
                <ViewToggle activeView={activeTab} onViewChange={setActiveTab} />
              </View>
              <LocationListView searchQuery={searchQuery} onLocationPress={handleLocationPress} />
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

