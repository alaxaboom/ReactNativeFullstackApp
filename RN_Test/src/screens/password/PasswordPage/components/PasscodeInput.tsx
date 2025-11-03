import React from 'react';
import { View } from 'react-native';
import { passcodeInputStyles as styles } from '../styles';

interface PasscodeInputProps {
  passcode: string[];
}

const PasscodeInput: React.FC<PasscodeInputProps> = ({ passcode }) => {
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

export default PasscodeInput;