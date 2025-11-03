import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BenefitCardProps } from '../types';
import styles from '../styles';

const BenefitCard: React.FC<BenefitCardProps> = ({ text, style }) => {
  return (
    <View style={style}>
      <Ionicons name="checkmark-sharp" size={18} color="white" />
      <Text style={styles.benefitText}>{text}</Text>
    </View>
  );
};

export default BenefitCard;