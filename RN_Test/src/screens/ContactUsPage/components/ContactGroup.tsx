import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { contactGroupStyles } from '../styles';
import { contactItemStyles } from '../styles';
type IconName = React.ComponentProps<typeof Ionicons>['name'];

type ContactGroupItem = {
  icon: IconName;
  label: string;
  value: string;
};

type ContactGroupProps = {
  items: ContactGroupItem[];
};

const ContactGroup: React.FC<ContactGroupProps> = ({ items }) => {
  return (
    <View style={contactGroupStyles.groupedContainer}>
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          <View style={contactGroupStyles.groupedContactItem}>
            <View style={contactItemStyles.contactRow}>
              <Ionicons name={item.icon} size={23} color="#666" />
              <Text style={contactItemStyles.contactLabel}>{item.label}</Text>
            </View>
            <View style={contactItemStyles.contactValueContainer}>
              <Text style={contactItemStyles.contactValue}>{item.value}</Text>
              <Ionicons name="chevron-forward" size={19} color="#999" />
            </View>
          </View>
          {index < items.length - 1 && <View style={contactGroupStyles.divider} />}
        </React.Fragment>
      ))}
    </View>
  );
};

export default ContactGroup;