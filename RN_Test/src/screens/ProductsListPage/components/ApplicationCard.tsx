import React from 'react';
import { View, Text } from 'react-native';
import { LoanApplication } from '../../../types';
import { formatDate } from '../service/helpers';
import {applicationCardStyles as styles} from '../styles';

type ApplicationCardProps = {
  application: LoanApplication;
};

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        Application #{application.id}
      </Text>
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

export default ApplicationCard;