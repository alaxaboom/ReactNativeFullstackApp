import React from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface BenefitCardProps {
  text: string;
  style?: StyleProp<ViewStyle>;
}

export const BenefitCard: React.FC<BenefitCardProps> = ({ text, style }) => {
  return (
    <View style={style}>
      <Ionicons name="checkmark-sharp" size={18} color="white" />
      <Text style={{ color: 'white', fontSize: 13, marginLeft: 8, fontWeight: '500', lineHeight: 16, flex: 1 }}>{text}</Text>
    </View>
  );
};

