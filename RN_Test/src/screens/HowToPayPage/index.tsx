import React from "react";
import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from "../../components/BottomNavigation";
import ClientInfoCard from "./components/ClientInfoCard";
import ImportantAlert from "./components/ImportantAlert";
import { pageStyles, mainCardStyles } from "./styles";

const HowToPayPage: React.FC = () => {
  const commonBankInfo = {
    user: 'MKD "Digital Finance international" d.o.o. Banja Luka',
    bank: "FORMER BANK ad Debtor Luke",
    billNumber: "5520001718929885",
  };

  return (
    <SafeAreaView style={pageStyles.pageContainer}>
      <ScrollView contentContainerStyle={pageStyles.scrollContainer}>
        <View style={mainCardStyles.mainCard}>
          <Text style={mainCardStyles.mainTitle}>How to pay</Text>

          <Text style={mainCardStyles.paragraph}>
            Five days before the due date of your loan, we will send you an SMS and an email to remind you to repay the loan. Log in to your personal account to see the loan status and check the payment information.
          </Text>

          <Text style={mainCardStyles.sectionTitle}>How do I repay the loan?</Text>
          <Text style={mainCardStyles.paragraph}>
            You can pay your funds directly to our account in Addiko Bank ad Banja Luka, at post office counters or via internet and mobile banking. The account must contain the following information:
          </Text>

          <ClientInfoCard
            title="For clients RS"
            bankInfo={{
              ...commonBankInfo,
              referenceNumber: "Credit Agreement number",
            }}
          />

          <ClientInfoCard
            title="For clients FBiH"
            bankInfo={{
              ...commonBankInfo,
              referenceNumber: "Loan contract number",
            }}
          />

          <ImportantAlert />
        </View>
      </ScrollView>

      <BottomNavigation currentScreen="howtopay" />
    </SafeAreaView>
  );
};

export default HowToPayPage;