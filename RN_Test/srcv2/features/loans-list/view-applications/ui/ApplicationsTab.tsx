import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { LoanApplication } from '../../../../shared/types';
import { ApplicationCard } from './ApplicationCard';

interface ApplicationsTabProps {
  applications: LoanApplication[];
  onGetStarted?: () => void;
}

export const ApplicationsTab: React.FC<ApplicationsTabProps> = ({ applications, onGetStarted }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {applications.length > 0 ? (
        applications.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No applications yet</Text>
          <Text style={styles.emptySubtitle}>
            You don't have any applications yet. Press the button to start.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
});


