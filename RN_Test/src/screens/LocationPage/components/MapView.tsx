import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
// TODO: Раскомментировать когда будет настроен Google Maps API
// import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';
// import ClusteredMapView from 'react-native-map-clustering';
import { Location } from '../../../types';
// import { useGetAllLocationsQuery, useSearchLocationsQuery } from '../../../store/api';
// import ClusterMarker from './ClusterMarker';

// Временный тип для Region
type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

interface MapViewProps {
  searchQuery?: string;
  onMarkerPress: (location: Location) => void;
  initialRegion?: Region;
}

const MapViewComponent: React.FC<MapViewProps> = ({
  searchQuery = '',
  onMarkerPress,
  initialRegion,
}) => {
  // TODO: Раскомментировать когда будет настроен Google Maps API
  // const mapRef = useRef<ClusteredMapView>(null);
  const mapRef = useRef<any>(null);
  const [region, setRegion] = useState<Region>(
    initialRegion || {
      latitude: 43.8563,
      longitude: 18.4131,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    }
  );

  // TODO: Раскомментировать когда будет настроен Google Maps API
  // const { data: allLocations, isLoading: isLoadingAll, error: errorAll } = useGetAllLocationsQuery();
  // const { data: searchResults, isLoading: isLoadingSearch, error: errorSearch } = useSearchLocationsQuery(searchQuery, {
  //   skip: !searchQuery || searchQuery.trim() === '',
  // });

  // const locations = useMemo(() => {
  //   let result: Location[] = [];
  //   if (searchQuery && searchQuery.trim() !== '' && searchResults) {
  //     result = searchResults;
  //   } else {
  //     result = allLocations || [];
  //   }
    
  //   // Валидация и нормализация координат
  //   const validLocations = result.filter((location) => {
  //     const lat = Number(location.latitude);
  //     const lng = Number(location.longitude);
  //     return !isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  //   });
    
  //   console.log('Locations loaded:', validLocations.length, 'of', result.length);
  //   return validLocations;
  // }, [searchQuery, searchResults, allLocations]);

  // const isLoading = isLoadingAll || isLoadingSearch;
  // const hasError = errorAll || errorSearch;
  
  const locations: Location[] = [];
  const isLoading = false;
  const hasError = false;

  // TODO: Раскомментировать когда будет настроен Google Maps API
  // const handleMarkerPress = (location: Location) => {
  //   onMarkerPress(location);
  // };

  // const renderMarker = (location: Location) => {
  //   try {
  //     const lat = Number(location.latitude);
  //     const lng = Number(location.longitude);
      
  //     if (isNaN(lat) || isNaN(lng)) {
  //       console.warn('Invalid coordinates for location:', location.id, lat, lng);
  //       return null;
  //     }
      
  //     return (
  //       <Marker
  //         key={location.id}
  //         coordinate={{
  //           latitude: lat,
  //           longitude: lng,
  //         }}
  //         onPress={() => handleMarkerPress(location)}
  //       >
  //         <View style={styles.markerContainer}>
  //           <View style={styles.marker} />
  //         </View>
  //       </Marker>
  //     );
  //   } catch (error) {
  //     console.error('Error rendering marker for location:', location.id, error);
  //     return null;
  //   }
  // };

  // TODO: Раскомментировать когда будет настроен Google Maps API
  // Временно показываем пустой placeholder
  return (
    <View style={styles.container}>
      <View style={styles.emptyContainer}>
        <Text style={styles.placeholderText}>Interactive map will be here</Text>
        <Text style={styles.placeholderSubtext}>Currently under development</Text>
      </View>
    </View>
  );

  /* Раскомментировать когда будет настроен Google Maps API:
  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.loadingText}>Loading map...</Text>
        </View>
      </View>
    );
  }

  if (hasError && (!locations || locations.length === 0)) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Text style={styles.emptyIconText}>!</Text>
          </View>
          <Text style={styles.emptyTitle}>Error loading locations</Text>
          <Text style={styles.emptySubtitle}>
            Please try again later.
          </Text>
        </View>
      </View>
    );
  }

  if (!isLoading && (!locations || locations.length === 0)) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Text style={styles.emptyIconText}>!</Text>
          </View>
          <Text style={styles.emptyTitle}>Nothing found</Text>
          <Text style={styles.emptySubtitle}>
            Please try different keyword or make sure that your search request is spelt correctly.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ClusteredMapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        onRegionChangeComplete={setRegion}
        clusterColor="#00C853"
        clusterTextColor="#fff"
        radius={50}
        extent={512}
        minZoom={0}
        maxZoom={20}
        renderCluster={(cluster) => {
          try {
            if (!cluster || !cluster.geometry || !cluster.geometry.coordinates) {
              return null;
            }
            return (
              <ClusterMarker
                cluster={cluster}
                onPress={() => {
                  try {
                    const coordinates = cluster.geometry.coordinates;
                    if (mapRef.current && coordinates && coordinates.length >= 2) {
                      mapRef.current.animateToRegion(
                        {
                          latitude: coordinates[1],
                          longitude: coordinates[0],
                          latitudeDelta: region.latitudeDelta * 0.5,
                          longitudeDelta: region.longitudeDelta * 0.5,
                        },
                        500
                      );
                    }
                  } catch (error) {
                    console.error('Error animating to region:', error);
                  }
                }}
              />
            );
          } catch (error) {
            console.error('Error rendering cluster:', error);
            return null;
          }
        }}
      >
        {locations && locations.length > 0 && locations.map((location) => renderMarker(location))}
      </ClusteredMapView>
    </View>
  );
  */
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#00C853',
    borderWidth: 3,
    borderColor: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyIconText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
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

export default MapViewComponent;
