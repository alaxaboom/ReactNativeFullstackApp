import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// TODO: Раскомментировать когда будет настроен Google Maps API
// import { useGetAllLocationsQuery, useSearchLocationsQuery } from '../../../store/api';
// import { Location } from '../../../types';
// import LocationItem from './LocationItem';

interface ListViewProps {
  searchQuery?: string;
  onLocationPress: (location: any) => void; // TODO: Заменить на Location когда раскомментируете
}

const ListView: React.FC<ListViewProps> = ({ searchQuery = '', onLocationPress }) => {
  // TODO: Раскомментировать когда будет настроен Google Maps API
  // const { data: allLocations, isLoading: isLoadingAll } = useGetAllLocationsQuery();
  // const { data: searchResults, isLoading: isLoadingSearch } = useSearchLocationsQuery(
  //   searchQuery,
  //   {
  //     skip: !searchQuery || searchQuery.trim() === '',
  //   }
  // );

  // const locations = useMemo(() => {
  //   if (searchQuery && searchQuery.trim() !== '' && searchResults) {
  //     return searchResults;
  //   }
  //   return allLocations || [];
  // }, [searchQuery, searchResults, allLocations]);

  // const isLoading = isLoadingAll || isLoadingSearch;

  // Временно показываем пустой placeholder
  return (
    <View style={styles.container}>
      <Text style={styles.listPlaceholderText}>List of locations will appear here</Text>
      <Text style={styles.listPlaceholderSubtext}>Awaiting backend integration</Text>
    </View>
  );

  /* Раскомментировать когда будет настроен Google Maps API:
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!locations || locations.length === 0) {
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
  */
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingBottom: 16,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
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
  listPlaceholderText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  listPlaceholderSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default ListView;
