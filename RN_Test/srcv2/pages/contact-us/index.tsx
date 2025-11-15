import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { BottomNavigation } from '../../widgets/bottom-navigation';
import { useNavigation } from '../../shared/lib/react-navigation/hooks';
import { ContactGroup, ContactItem, CallMeBackButton } from '../../features/contact/contact-us';
import { styles } from './styles';

export const ContactUsPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  const handleCallMeBack = () => {
    navigateTo('callback');
  };

  const groupedContacts = [
    { icon: 'call-outline' as const, label: 'Call us', value: '12019011' },
    { icon: 'mail-outline' as const, label: 'Email', value: 'Info@forza.ba' },
    { icon: 'chatbubble-outline' as const, label: 'Viber', value: 'forzafinance' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Contact us</Text>
          <Text style={styles.subtitle}>Contact center is available 24 hours a day</Text>
        </View>

        <ContactGroup items={groupedContacts} />

        <ContactItem icon="heart" label="Recommend app" />
        <ContactItem icon="location-outline" label="Locations" value="12019011" />
        <ContactItem icon="logo-facebook" label="Facebook" value="forzafinance" />

        <CallMeBackButton onPress={handleCallMeBack} />
      </ScrollView>

      <BottomNavigation currentScreen="contacts" />
    </View>
  );
};


