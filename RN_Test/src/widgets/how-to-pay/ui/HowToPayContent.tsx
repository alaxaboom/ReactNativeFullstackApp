import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClientInfoCard } from './ClientInfoCard';
import { ImportantAlert } from './ImportantAlert';
import { styles } from './styles';

export const HowToPayContent: React.FC = () => {
  const commonBankInfo = {
    user: 'MKD "Digital Finance international" d.o.o. Banja Luka',
    bank: 'FORMER BANK ad Debtor Luke',
    billNumber: '5520001718929885',
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mainCard}>
          <Text style={styles.mainTitle}>How to pay</Text>

          <Text style={styles.paragraph}>
            Five days before the due date of your loan, we will send you an SMS and an email to remind you to repay the loan. Log in to your personal account to see the loan status and check the payment information.
          </Text>

          <Text style={styles.sectionTitle}>How do I repay the loan?</Text>
          <Text style={styles.paragraph}>
            You can pay your funds directly to our account in Addiko Bank ad Banja Luka, at post office counters or via internet and mobile banking. The account must contain the following information:
          </Text>

          <ClientInfoCard
            title="For clients RS"
            bankInfo={{
              ...commonBankInfo,
              referenceNumber: 'Credit Agreement number',
            }}
          />

          <ClientInfoCard
            title="For clients FBiH"
            bankInfo={{
              ...commonBankInfo,
              referenceNumber: 'Loan contract number',
            }}
          />

          <ImportantAlert />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

