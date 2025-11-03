import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { LoanApplication } from '../../../types';
import { formatDate, formatNumberValue } from '../service/helpers';
import { loanCardStyles, productsListPageStyles, creditDetailsModalStyles } from '../styles';
import CreditDetailsModal from './CreditDetailsModal';
import { useNavigation } from '../../../contexts/NavigationContext';

type LoanCardProps = {
  loan: LoanApplication | null;
  onGetStarted?: () => void;
};

const LoanCard: React.FC<LoanCardProps> = ({ loan, onGetStarted }) => {
  const { navigateTo } = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!loan) {
    return (
      <View style={productsListPageStyles.getStartedContainer}>
        <Text style={productsListPageStyles.getStartedTitle}>You can get up to</Text>
        <Text style={productsListPageStyles.getStartedAmount}>600 BAM</Text>
        <TouchableOpacity style={productsListPageStyles.getStartedButton} onPress={onGetStarted}>
          <Text style={productsListPageStyles.getStartedButtonText}>Get started</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
    <View style={loanCardStyles.card}>
      <Text style={loanCardStyles.cardTitle}>Credit #{loan.id}</Text>
      <View style={loanCardStyles.row}>
        <Text style={loanCardStyles.label}>Status</Text>
        <Text style={loanCardStyles.value}>{getStatusText(loan.status)}</Text>
      </View>
      <View style={loanCardStyles.row}>
        <Text style={loanCardStyles.label}>Created on</Text>
        <Text style={loanCardStyles.value}>{formatDate(loan.createdAt)}</Text>
      </View>
      <View style={loanCardStyles.row}>
        <Text style={loanCardStyles.label}>Loan amount</Text>
        <Text style={loanCardStyles.value}>
          {formatNumberValue(loan.loanAmount, { suffix: ' BAM' })}
        </Text>
      </View>
      <TouchableOpacity
        style={loanCardStyles.detailsButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={loanCardStyles.detailsButtonText}>Details</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity
          style={creditDetailsModalStyles.overlay}
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

export default LoanCard;