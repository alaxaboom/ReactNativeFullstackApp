import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LoanApplication } from '../../../types';
import { formatDate, formatNumberValue } from '../service/helpers';
import { creditDetailsModalStyles as styles } from '../styles';
import { useNavigation } from '../../../contexts/NavigationContext';

type CreditDetailsModalProps = {
  loan: LoanApplication;
  onClose: () => void;
};

const CreditDetailsModal: React.FC<CreditDetailsModalProps> = ({ loan, onClose }) => {
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
          {formatNumberValue(loan.totalToReturn, { suffix: ' BAM' })}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.label}>Loan amount</Text>
        <Text style={styles.value}>
          {formatNumberValue(loan.loanAmount, { suffix: ' BAM' })}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Fee</Text>
        <Text style={styles.value}>
          {formatNumberValue(loan.fee, { suffix: ' BAM' })}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Interest</Text>
        <Text style={styles.value}>
          {formatNumberValue(loan.interestRate, { suffix: '%' })}
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

export default CreditDetailsModal;