import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import { useAuth } from '../../../../shared/hooks/useAuth';
import { styles } from './LogoutButton.styles';
import { NavigationFunction } from '../../../../shared/types/navigation';

interface LogoutButtonProps {
  navigateTo: NavigationFunction;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ navigateTo }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigateTo('firstpage');
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={styles.logoutButton}
      onPress={handleLogout}
    >
      <Text style={styles.logoutButtonText}>Log Out</Text>
    </TouchableOpacity>
  );
};


