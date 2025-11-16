import React from 'react';
import { View, StyleSheet } from 'react-native';

interface PasscodeInputProps {
  passcode: string[];
}

export const PasscodeInput: React.FC<PasscodeInputProps> = ({ passcode }) => {
  return (
    <View style={styles.passcodeContainer}>
      {[0, 1, 2, 3].map((index) => (
        <View
          key={index}
          style={[
            styles.passcodeCircle,
            passcode[index] && styles.passcodeCircleFilled,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  passcodeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 16,
  },
  passcodeCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  passcodeCircleFilled: {
    backgroundColor: '#00C853',
  },
});


