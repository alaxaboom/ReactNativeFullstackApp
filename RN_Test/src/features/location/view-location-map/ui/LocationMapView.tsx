import React, { useState, useRef, useMemo, useImperativeHandle, forwardRef, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';
import ClusteredMapView from 'react-native-map-clustering';
import { Location } from '../../../../shared/types';
import { useGetAllLocationsQuery, useSearchLocationsQuery } from '../../../../entities/location';

interface LocationMapViewProps {
  searchQuery?: string;
  onMarkerPress: (location: Location) => void;
  initialRegion?: Region;
}

export interface LocationMapViewRef {
  animateToLocation: (location: Location) => void;
}

export const LocationMapView = forwardRef<LocationMapViewRef, LocationMapViewProps>(({
  searchQuery = '',
  onMarkerPress,
  initialRegion,
}, ref) => {
  const mapRef = useRef<ClusteredMapView>(null);
  const [region, setRegion] = useState<Region>(
    initialRegion || {
      latitude: 55.7558,
      longitude: 37.6173,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    }
  );

  const { data: allLocations, isLoading: isLoadingAll, error: errorAll } = useGetAllLocationsQuery();
  const { data: searchResults, isLoading: isLoadingSearch, error: errorSearch } = useSearchLocationsQuery(searchQuery, {
    skip: !searchQuery || searchQuery.trim() === '',
  });

  const locations = useMemo(() => {
    let result: Location[] = [];
    if (searchQuery && searchQuery.trim() !== '' && searchResults) {
      result = searchResults;
    } else {
      result = allLocations || [];
    }
    
    const validLocations = result.filter((location) => {
      const lat = Number(location.latitude);
      const lng = Number(location.longitude);
      return !isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
    });
    
    return validLocations;
  }, [searchQuery, searchResults, allLocations]);

  const isLoading = isLoadingAll || isLoadingSearch;
  const hasError = errorAll || errorSearch;

  const handleMarkerPress = useCallback((location: Location) => {
    onMarkerPress(location);
  }, [onMarkerPress]);

  const animateToLocation = (location: Location) => {
    try {
      const lat = Number(location.latitude);
      const lng = Number(location.longitude);
      
      if (!isNaN(lat) && !isNaN(lng) && mapRef.current) {
        const targetRegion: Region = {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0001,
          longitudeDelta: 0.0001,
        };
        
        const clusteredMap = mapRef.current as any;
        
        if (clusteredMap.getMap) {
          const map = clusteredMap.getMap();
          if (map && map.animateToRegion) {
            map.animateToRegion(targetRegion, 1000);
            return;
          }
          if (map && map.animateCamera) {
            map.animateCamera({
              center: { latitude: lat, longitude: lng },
              zoom: 20,
            }, { duration: 1000 });
            return;
          }
        }
        
        if (clusteredMap.animateToRegion) {
          clusteredMap.animateToRegion(targetRegion, 1000);
          return;
        }
        
        if (clusteredMap.animateCamera) {
          clusteredMap.animateCamera({
            center: { latitude: lat, longitude: lng },
            zoom: 20,
          }, { duration: 1000 });
          return;
        }
        
        setRegion(targetRegion);
      }
    } catch (error) {
      console.error('Error animating to location:', error);
    }
  };

  useImperativeHandle(ref, () => ({
    animateToLocation,
  }));

  const roundedDelta = useMemo(() => {
    return Math.round((region.latitudeDelta || 0.1) * 1000) / 1000;
  }, [region.latitudeDelta]);

  const radiusInPixels = useMemo(() => {
    try {
      const currentDelta = region.latitudeDelta || 0.1;
      if (currentDelta <= 0 || isNaN(currentDelta)) {
        return 5;
      }
      const minRadius = 2;
      const maxRadius = 8;
      const baseDelta = 0.1;
      const scaleFactor = currentDelta / baseDelta;
      const calculatedRadius = 5 * scaleFactor;
      const result = Math.max(minRadius, Math.min(maxRadius, Math.round(calculatedRadius)));
      return isNaN(result) ? 5 : result;
    } catch (error) {
      console.error('Error calculating radius:', error);
      return 5;
    }
  }, [roundedDelta]);

  const renderMarker = useCallback((location: Location) => {
    try {
      const lat = Number(location.latitude);
      const lng = Number(location.longitude);
      
      if (isNaN(lat) || isNaN(lng)) {
        return null;
      }
      
      return (
        <Marker
          key={`marker-${location.id}`}
          identifier={`marker-${location.id}`}
          coordinate={{
            latitude: lat,
            longitude: lng,
          }}
          pinColor="#00C853"
          tracksViewChanges={false}
          onPress={() => handleMarkerPress(location)}
        />
      );
    } catch (error) {
      return null;
    }
  }, [handleMarkerPress]);

  const safeRadius = radiusInPixels > 0 && isFinite(radiusInPixels) ? radiusInPixels : 10;

  const regionRef = useRef(region);
  regionRef.current = region;

  const handleRegionChange = useCallback((newRegion: Region) => {
    const roundedDelta = Math.round(newRegion.latitudeDelta * 1000) / 1000;
    const currentRounded = Math.round(regionRef.current.latitudeDelta * 1000) / 1000;
    if (roundedDelta !== currentRounded) {
      setRegion(newRegion);
    }
  }, []);

  const renderCluster = useCallback((cluster: any) => {
    try {
      if (!cluster || !cluster.geometry || !cluster.geometry.coordinates) {
        return null;
      }
      const pointCount = cluster.properties?.point_count || cluster.properties?.cluster_id || 0;
      const coordinates = cluster.geometry.coordinates;
      
      const clusterId = cluster.id || `${coordinates[0]}-${coordinates[1]}`;
      return (
        <Marker
          key={`cluster-${clusterId}`}
          identifier={`cluster-${clusterId}`}
          coordinate={{
            latitude: coordinates[1],
            longitude: coordinates[0],
          }}
          tracksViewChanges={false}
          onPress={() => {
            try {
              if (mapRef.current && coordinates && coordinates.length >= 2) {
                const clusteredMap = mapRef.current as ClusteredMapView & { getMap?: () => { animateToRegion?: (region: Region, duration?: number) => void; animateCamera?: (camera: { center: { latitude: number; longitude: number }; zoom: number }, options: { duration: number }) => void } };
                const map = clusteredMap.getMap ? clusteredMap.getMap() : clusteredMap;
                const currentRegion = regionRef.current;
                if (map && 'animateToRegion' in map && map.animateToRegion) {
                  map.animateToRegion(
                    {
                      latitude: coordinates[1],
                      longitude: coordinates[0],
                      latitudeDelta: currentRegion.latitudeDelta * 0.5,
                      longitudeDelta: currentRegion.longitudeDelta * 0.5,
                    },
                    500
                  );
                } else if (map && 'animateCamera' in map && map.animateCamera) {
                  map.animateCamera({
                    center: {
                      latitude: coordinates[1],
                      longitude: coordinates[0],
                    },
                    zoom: 15,
                  }, { duration: 500 });
                }
              }
            } catch (error) {
              console.error('Error animating to region:', error);
            }
          }}
        >
          <View style={styles.clusterContainer}>
            <View style={styles.clusterMarker}>
              <Text style={styles.clusterText}>{pointCount}</Text>
            </View>
          </View>
        </Marker>
      );
    } catch (error) {
      return null;
    }
  }, []);

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
        <View style={styles.emptyCard}>
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
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ClusteredMapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        initialRegion={region}
        onRegionChangeComplete={handleRegionChange}
        radius={safeRadius}
        extent={256}
        minZoom={0}
        maxZoom={20}
        renderCluster={renderCluster}
      >
        {locations && locations.length > 0 && locations
          .map((location) => renderMarker(location))
          .filter((marker) => marker !== null)}
      </ClusteredMapView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 30,
    height: 40,
  },
  markerTeardrop: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#00C853',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  markerTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#00C853',
    marginTop: -1,
  },
  clusterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  clusterMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#00C853',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
  clusterText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#00C853',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
    lineHeight: 13,
  },
  emptyCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyIconText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF9800',
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
});

