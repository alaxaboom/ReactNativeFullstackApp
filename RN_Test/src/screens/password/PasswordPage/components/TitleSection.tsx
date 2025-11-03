import React from 'react';
import { Text, View } from 'react-native';
import { titleSectionStyles as styles } from '../styles';

interface TitleSectionProps {
  title: string;
  subtitle: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.titleSection}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default TitleSection;