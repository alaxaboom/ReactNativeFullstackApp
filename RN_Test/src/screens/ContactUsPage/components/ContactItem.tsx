import React from 'react';
import { View, Text, GestureResponderEvent } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { contactItemStyles as styles } from '../styles';
type IconName = React.ComponentProps<typeof Ionicons>['name'];

type ContactItemProps = {
  icon: IconName;
  label: string;
  value?: string;
  onPress?: () => void;
};

const ContactItem: React.FC<ContactItemProps> = ({ icon, label, value, onPress }) => {
  const handlePress = (e: GestureResponderEvent) => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <View
      style={styles.contactItem}
      {...(onPress ? { onTouchStart: handlePress } : {})}
    >
      <View style={styles.contactRow}>
        <Ionicons
          name={icon}
          size={23}
          color={label === 'Recommend app' ? '#FF4081' : '#666'}
        />
        <Text style={styles.contactLabel}>{label}</Text>
      </View>
      {value ? (
        <View style={styles.contactValueContainer}>
          <Text style={styles.contactValue}>{value}</Text>
          <Ionicons name="chevron-forward" size={19} color="#999" />
        </View>
      ) : (
        <Ionicons name="chevron-forward" size={19} color="#999" />
      )}
    </View>
  );
};

export default ContactItem;