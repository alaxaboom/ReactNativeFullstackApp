import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LoanApplication } from '../../../../shared/types';
import { formatDate } from '../../../../shared/utils/dateUtils';
import { formatNumber } from '../../../../shared/utils/formatUtils';
import { useNavigation } from '../../../../shared/lib/react-navigation/hooks';

interface CreditDetailsModalProps {
  loan: LoanApplication;
  onClose: () => void;
}

export const CreditDetailsModal: React.FC<CreditDetailsModalProps> = ({ loan, onClose }) => {
  const { navigateTo } = useNavigation();

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Active';
      case 'paid_off': return 'Paid off';
      case 'closed': return 'Closed';
      case 'in_arrears': return 'In arrears';
      default: return status;
    }
  };

  const handleHowToPay = () => {
    onClose();
    navigateTo('howtopay');
  };

  const handleRequestExtension = () => {
    onClose();
    navigateTo('howtopayextension');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Credit details</Text>

      <View style={styles.divider} />

      <View style={styles.highlightedSection}>
        <Text style={styles.highlightedLabel}>First installment due date</Text>
        <Text style={styles.highlightedValue}>
          {loan.firstInstallmentDueDate ? formatDate(loan.firstInstallmentDueDate) : '—'}
        </Text>
      </View>

      <View style={styles.highlightedSection}>
        <Text style={styles.highlightedLabel}>Total for return</Text>
        <Text style={styles.highlightedValue}>
          {formatNumber(loan.totalToReturn, { suffix: ' BAM' })}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.label}>Loan amount</Text>
        <Text style={styles.value}>
          {formatNumber(loan.loanAmount, { suffix: ' BAM' })}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Fee</Text>
        <Text style={styles.value}>
          {formatNumber(loan.fee, { suffix: ' BAM' })}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Interest</Text>
        <Text style={styles.value}>
          {formatNumber(loan.interestRate, { suffix: '%' })}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Application number</Text>
        <Text style={styles.value}>{loan.id}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>{getStatusText(loan.status)}</Text>
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handleHowToPay}>
        <Text style={styles.payButtonText}>How to pay</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.extensionButton} onPress={handleRequestExtension}>
        <Text style={styles.extensionButtonText}>Request loan extension</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    maxHeight: '85%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 20,
    marginTop: 20,
    textAlign: 'left',
    color: '#333',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 15,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  highlightedSection: {
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  highlightedLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  highlightedValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  divider: {
    height: 2,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
    marginHorizontal: 20,
  },
  payButton: {
    backgroundColor: '#00C853',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  payButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  extensionButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  extensionButtonText: {
    color: '#999',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
