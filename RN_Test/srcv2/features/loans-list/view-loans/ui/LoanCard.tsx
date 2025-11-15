import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { LoanApplication } from '../../../../shared/types';
import { formatDate } from '../../../../shared/utils/dateUtils';
import { formatNumber } from '../../../../shared/utils/formatUtils';
import { CreditDetailsModal } from './CreditDetailsModal';

interface LoanCardProps {
  loan: LoanApplication;
  onGetStarted?: () => void;
}

export const LoanCard: React.FC<LoanCardProps> = ({ loan, onGetStarted }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Active';
      case 'paid_off': return 'Paid off';
      case 'closed': return 'Closed';
      case 'in_arrears': return 'In arrears';
      default: return status;
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Credit #{loan.id}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>{getStatusText(loan.status)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Created on</Text>
        <Text style={styles.value}>{formatDate(loan.createdAt)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Loan amount</Text>
        <Text style={styles.value}>{formatNumber(loan.loanAmount, { suffix: ' BAM' })}</Text>
      </View>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.detailsButtonText}>Details</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setIsModalVisible(false)}
        >
          <CreditDetailsModal
            loan={loan}
            onClose={() => setIsModalVisible(false)}
          />
        </TouchableOpacity>
      </Modal>
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
  detailsButton: {
    marginTop: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  getStartedContainer: {
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  getStartedTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  getStartedAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  getStartedButton: {
    backgroundColor: '#00C853',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    width: '100%',
  },
  getStartedButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
});


