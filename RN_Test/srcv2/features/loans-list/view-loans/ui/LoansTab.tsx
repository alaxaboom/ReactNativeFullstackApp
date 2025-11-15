import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { LoanApplication } from '../../../../shared/types';
import { LoanCard } from './LoanCard';

interface LoansTabProps {
  loans: LoanApplication[];
  onGetStarted?: () => void;
}

export const LoansTab: React.FC<LoansTabProps> = ({ loans, onGetStarted }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {loans.length > 0 ? (
        loans.map((loan) => (
          <LoanCard key={loan.id} loan={loan} />
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No credits yet</Text>
          <Text style={styles.emptySubtitle}>
            You don't have any credits yet. Press the button to choose a loan.
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


