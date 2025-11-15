import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LoanApplication } from '../../../shared/types';

interface ApplicationStatusBadgeProps {
  status: LoanApplication['status'];
}

export const ApplicationStatusBadge: React.FC<ApplicationStatusBadgeProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'approved':
        return '#00C853';
      case 'pending':
        return '#FFA726';
      case 'rejected':
        return '#EF5350';
      case 'paid_off':
        return '#42A5F5';
      default:
        return '#999';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'pending':
        return 'Pending';
      case 'rejected':
        return 'Rejected';
      case 'paid_off':
        return 'Paid Off';
      default:
        return status;
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: getStatusColor() }]}>
      <Text style={styles.text}>{getStatusText()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

