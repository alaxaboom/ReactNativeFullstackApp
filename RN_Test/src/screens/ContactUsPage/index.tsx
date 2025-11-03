import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { NavigationFunction } from '../../types';
import BottomNavigation from '../../components/BottomNavigation';
import ContactGroup from './components/ContactGroup';
import ContactItem from './components/ContactItem';
import CallMeBackButton from './components/CallMeBackButton';
import { pageStyles } from './styles';
import { useNavigation } from '../../contexts/NavigationContext';

type ContactUsPageProps = {};

const ContactUsPage: React.FC<ContactUsPageProps> = () => {
  const { navigateTo } = useNavigation();
  const handleCallMeBack = () => {
    navigateTo('callback');
  };

  const groupedContacts = [
    { icon: 'call-outline', label: 'Call us', value: '12019011' },
    { icon: 'mail-outline', label: 'Email', value: 'Info@forza.ba' },
    { icon: 'chatbubble-outline', label: 'Viber', value: 'forzafinance' },
  ];

  return (
    <View style={pageStyles.container}>
      <ScrollView style={pageStyles.scrollContainer}>
        <View style={pageStyles.header}>
          <Text style={pageStyles.title}>Contact us</Text>
          <Text style={pageStyles.subtitle}>Contact center is available 24 hours a day</Text>
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

export default ContactUsPage;