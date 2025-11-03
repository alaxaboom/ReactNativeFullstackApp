import React from 'react';
import { View } from 'react-native';
import { stepIndicatorStyles as styles } from '../styles';

const StepIndicator: React.FC = () => {
  return (
    <View style={styles.stepIndicatorContainer}>
      {[0, 1, 2, 3].map((index) => (
        <View
          key={index}
          style={[
            styles.stepDot,
            {
              backgroundColor: index < 3 ? '#00C853' : '#e0e0e0',
            },
          ]}
        />
      ))}
    </View>
  );
};

export default StepIndicator;