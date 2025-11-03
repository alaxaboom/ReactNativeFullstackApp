import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ActionButtonProps } from '../types';
import styles from '../styles';

const ActionButton: React.FC<ActionButtonProps> = ({
  iconName,
  title,
  subtitle,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={28} color="white" />
      </View>
      <View style={styles.actionButtonTextContainer}>
        <Text style={styles.actionButtonTitle}>{title}</Text>
        <Text style={styles.actionButtonSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ActionButton;