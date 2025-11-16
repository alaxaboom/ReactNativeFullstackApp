import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface TitleSectionProps {
  title: string;
  subtitle: string;
}

export const TitleSection: React.FC<TitleSectionProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.titleSection}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  titleSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});




