import React from 'react';
import { Text, View } from 'react-native';
import { titleSectionStyles as styles } from '../styles';

const TitleSection: React.FC = () => {
  return (
    <View style={styles.titleSection}>
      <Text style={styles.title}>Use Bio Metrics</Text>
      <Text style={styles.subtitle}>
        Use Bio Metrics to log into the app faster{"\n"}
        and more securely.
      </Text>
    </View>
  );
};

export default TitleSection;