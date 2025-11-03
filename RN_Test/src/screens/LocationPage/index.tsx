import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView from './components/MapView';
import ListView from './components/ListView';
import { locationPageStyles as styles } from './styles';
import { LocationPageProps } from './types';
import { useSmartNavigation } from '../../utils/smartNavigation';
import { useNavigation } from '../../contexts/NavigationContext';

const LocationPage: React.FC<LocationPageProps> = () => {
  const { navigateTo } = useNavigation();
  const [activeTab, setActiveTab] = useState<'map' | 'list'>('map');
  const { navigateToHomeOrFirst } = useSmartNavigation();

  const handleBack = () => {
    navigateToHomeOrFirst(navigateTo);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Locations</Text>
        <View style={styles.searchIcon}>
          <Ionicons name="search" size={24} color="#333" />
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'map' && styles.activeTab]}
          onPress={() => setActiveTab('map')}
        >
          <Text style={[styles.tabText, activeTab === 'map' && styles.activeTabText]}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'list' && styles.activeTab]}
          onPress={() => setActiveTab('list')}
        >
          <Text style={[styles.tabText, activeTab === 'list' && styles.activeTabText]}>List</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'map' ? <MapView /> : <ListView />}
    </SafeAreaView>
  );
};

export default LocationPage;