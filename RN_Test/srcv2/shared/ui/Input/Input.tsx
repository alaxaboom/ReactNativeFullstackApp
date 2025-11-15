import React from 'react';
import { TextInput, StyleSheet, ViewStyle, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  style?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({ style, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor="#999"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
});

