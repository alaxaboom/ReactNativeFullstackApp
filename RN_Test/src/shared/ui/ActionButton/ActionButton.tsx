import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ActionButtonProps {
  iconName: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  style?: ViewStyle;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  iconName,
  title,
  subtitle,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <View style={{ width: 45, height: 45, borderRadius: 16, backgroundColor: '#00C853', justifyContent: 'center', alignItems: 'center', marginBottom: 16, alignSelf: 'flex-start' }}>
        <Ionicons name={iconName} size={28} color="white" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 }}>{title}</Text>
        <Text style={{ fontSize: 14, color: '#666' }}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

