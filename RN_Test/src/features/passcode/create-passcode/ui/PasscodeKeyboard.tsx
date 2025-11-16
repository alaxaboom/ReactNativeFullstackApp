import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

interface PasscodeKeyboardProps {
  onNumberPress: (num: string) => void;
  onBackspace: () => void;
}

export const PasscodeKeyboard: React.FC<PasscodeKeyboardProps> = ({
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

const styles = StyleSheet.create({
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 70,
    marginBottom: -80,
  },
  keyboardButton: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1.5%',
  },
  emptyButton: {
    backgroundColor: 'transparent',
  },
  keyboardButtonText: {
    fontSize: 32,
    fontWeight: '300',
    color: '#333',
  },
});


