import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AccordionItem } from './AccordionItem';
import { styles } from './styles';

export const HowToPayExtensionContent: React.FC = () => {
  const faqData = [
    {
      id: 'repayment',
      question: 'How are short-term loans repaid?',
      answer: 'You can pay your funds directly to our account in Addiko Bank ad Banja Luka, at post office counters or via internet and mobile banking. The account must contain the following information: User: MKD "Digital Finance international" d.o.o. Banja Luka, Bank: FORMER BANK ad Debtor Luke, Bill number: 5520001718929885. For clients RS, use Credit Agreement number as reference. For clients FBiH, use Loan contract number as reference.',
    },
    {
      id: 'delay',
      question: 'What should I do if I cannot repay the loan on time?',
      answer: 'If you think that you will not be able to pay back the loan on time, then you should log in to your profile on our web address forza.ba and check the options for extending the loan due date. Choose the option that suits you best and pay the amount for the extension. Only when the money for the extension has been paid into our account can we grant you a new due date. You can also contact our customer center and our associates will help you with everything that interests you. Our phone number is on our website.',
    },
    {
      id: 'period',
      question: 'What repayment period do you recommend?',
      answer: 'We recommend choosing a repayment period that fits your financial situation. You can select from available options during the loan application process. If you need to adjust it later, please contact us before the deadline.',
    },
    {
      id: 'extend',
      question: 'Can I extend the maturity of my loan?',
      answer: 'Yes, you can extend the maturity of your loan by paying the extension fee before the original due date. Log in to your profile on forza.ba to see available extension options and proceed with payment.',
    },
    {
      id: 'early',
      question: 'Can I pay off the loan before the due date?',
      answer: 'Yes, you can repay your loan early without any penalties. Simply make the full payment to our bank account using your loan contract number as the reference.',
    },
    {
      id: 'wait',
      question: 'After you approve the loan, how long do I have to wait for the payment?',
      answer: 'Once your loan is approved, the funds are typically transferred to your bank account within 24 hours. Please ensure your bank details are correct to avoid delays.',
    },
    {
      id: 'documents',
      question: 'Do I have to send you any documents by mail?',
      answer: 'No, all required documents are submitted digitally during the online application process. There is no need to send physical copies by mail.',
    },
    {
      id: 'amount',
      question: 'How much do I have to repay?',
      answer: 'The total repayment amount includes the principal loan amount plus any applicable interest and fees. This amount is clearly displayed in your personal account before you confirm the loan.',
    },
    {
      id: 'renew',
      question: 'When can I renew my loan?',
      answer: 'You can apply for a new loan once your current loan is fully repaid. We recommend applying at least 3 days before you need the funds to allow time for approval and disbursement.',
    },
  ];

  return (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mainCard}>
          <Text style={styles.mainTitle}>Payment, repayment and delay</Text>

          {faqData.map((item) => (
            <AccordionItem
              key={item.id}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

