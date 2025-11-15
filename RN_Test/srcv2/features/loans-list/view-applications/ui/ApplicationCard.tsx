import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LoanApplication } from '../../../../shared/types';
import { formatDate } from '../../../../shared/utils/dateUtils';

interface ApplicationCardProps {
  application: LoanApplication;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Application #{application.id}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>{application.status}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Date of application</Text>
        <Text style={styles.value}>{formatDate(application.createdAt)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Loan amount</Text>
        <Text style={styles.value}>{application.loanAmount} BAM</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Monthly payment</Text>
        <Text style={styles.value}>{application.monthlyRepayment} BAM</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>First installment due date</Text>
        <Text style={styles.value}>{formatDate(application.firstInstallmentDueDate)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});


