import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { callBackButtonStyles as styles } from '../styles';

type CallMeBackButtonProps = {
  onPress: () => void;
};

const CallMeBackButton: React.FC<CallMeBackButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.callBackButton} onPress={onPress}>
      <Text style={styles.callBackButtonText}>Call me back</Text>
    </TouchableOpacity>
  );
};

export default CallMeBackButton;