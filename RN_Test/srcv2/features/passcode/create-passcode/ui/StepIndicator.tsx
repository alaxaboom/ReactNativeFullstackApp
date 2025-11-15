import React from 'react';
import { View, StyleSheet } from 'react-native';

interface StepIndicatorProps {
  currentStepIndex: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStepIndex }) => {
  if (currentStepIndex === 0) return null;

  return (
    <View style={styles.stepIndicatorContainer}>
      {[0, 1, 2, 3].map((index) => (
        <View
          key={index}
          style={[
            styles.stepDot,
            {
              backgroundColor: index < currentStepIndex ? '#00C853' : '#e0e0e0',
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 60,
    gap: 12,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});


