// FirstPage/components/ActionButton/index.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ActionButtonProps } from '../types';
import { ActionButtonStyles } from '../styles';

const ActionButton: React.FC<ActionButtonProps> = ({
  iconName,
  title,
  subtitle,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <View style={ActionButtonStyles.iconContainer}>
        <Ionicons name={iconName} size={28} color="white" />
      </View>
      <View style={ActionButtonStyles.actionButtonTextContainer}>
        <Text style={ActionButtonStyles.actionButtonTitle}>{title}</Text>
        <Text style={ActionButtonStyles.actionButtonSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ActionButton;