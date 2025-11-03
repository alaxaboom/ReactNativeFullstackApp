import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { LogoutButtonStyles as styles } from '../styles';

interface LogoutButtonProps {
  onPress: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress }) => (
  <TouchableOpacity style={styles.logoutButton} onPress={onPress}>
    <Text style={styles.logoutButtonText}>Log Out</Text>
  </TouchableOpacity>
);

export default LogoutButton;