import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

export const ImportantAlert: React.FC = () => {
  return (
    <View style={styles.alertContainer}>
      <View style={styles.alertHeader}>
        <Text style={styles.alertTitle}>Important</Text>
        <View style={styles.exclamationIcon}>
          <Text style={styles.exclamationText}>!</Text>
        </View>
      </View>
      <Text style={styles.alertText}>
        For the sake of correct records of your payment, please enter the correct number of the loan batch in the CALL NUMBER field. If you are not able to repay the loan on time, and in order to avoid unnecessary delay costs, please contact us before the expiry of the deadline at number 051-492-610, option 2. In case of delay, reminders and debt collection are done by phone, SMS messages, e-mails and written reminders to the borrower and other persons listed in the contact list.
      </Text>
    </View>
  );
};

