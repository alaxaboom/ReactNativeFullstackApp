import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

type ContactGroupItem = {
  icon: IconName;
  label: string;
  value: string;
};

type ContactGroupProps = {
  items: ContactGroupItem[];
};

export const ContactGroup: React.FC<ContactGroupProps> = ({ items }) => {
  return (
    <View style={styles.groupedContainer}>
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          <View style={styles.groupedContactItem}>
            <View style={styles.contactRow}>
              <Ionicons name={item.icon} size={23} color="#666" />
              <Text style={styles.contactLabel}>{item.label}</Text>
            </View>
            <View style={styles.contactValueContainer}>
              <Text style={styles.contactValue}>{item.value}</Text>
              <Ionicons name="chevron-forward" size={19} color="#999" />
            </View>
          </View>
          {index < items.length - 1 && <View style={styles.divider} />}
        </React.Fragment>
      ))}
    </View>
  );
};

