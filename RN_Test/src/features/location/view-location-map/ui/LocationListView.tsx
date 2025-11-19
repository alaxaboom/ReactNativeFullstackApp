import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { Location } from '../../../../shared/types';
import { useGetAllLocationsQuery } from '../../../../entities/location';
import { LocationItem } from '../../view-location-details';

interface LocationListViewProps {
  searchQuery?: string;
  onLocationPress: (location: Location) => void;
}

export const LocationListView: React.FC<LocationListViewProps> = ({ searchQuery = '', onLocationPress }) => {
  const { data: allLocations, isLoading: isLoadingAll } = useGetAllLocationsQuery();

  const locations = useMemo(() => {
    if (!allLocations) return [];
    
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      return allLocations.filter(
        (location) =>
          location.name?.toLowerCase().includes(query) ||
          location.address?.toLowerCase().includes(query) ||
          location.category?.toLowerCase().includes(query)
      );
    }
    return allLocations;
  }, [searchQuery, allLocations]);

  const isLoading = isLoadingAll;

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyCard}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  if (!locations || locations.length === 0) {
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

  const sections = [
    {
      title: 'Branches',
      data: locations,
    },
  ];

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <LocationItem location={item} onPress={onLocationPress} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingBottom: 16,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 32,
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
});

