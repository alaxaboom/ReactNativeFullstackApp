import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { passcodeKeyboardStyles as styles } from '../styles';

interface PasscodeKeyboardProps {
  onNumberPress: (num: string) => void;
  onBackspace: () => void;
}

const PasscodeKeyboard: React.FC<PasscodeKeyboardProps> = ({
  onNumberPress,
  onBackspace,
}) => {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];

  return (
    <View style={styles.keyboard}>
      {numbers.map((num, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.keyboardButton, num === '' && styles.emptyButton]}
          onPress={() => {
            if (num === '⌫') {
              onBackspace();
            } else if (num !== '') {
              onNumberPress(num);
            }
          }}
          disabled={num === ''}
        >
          {num !== '' && <Text style={styles.keyboardButtonText}>{num}</Text>}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PasscodeKeyboard;