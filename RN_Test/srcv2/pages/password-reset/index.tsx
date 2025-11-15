import React from 'react';
import { PasswordResetForm } from '../../features/auth/password-reset';
import { useNavigation } from '../../shared/lib/react-navigation/hooks';

export const PasswordResetPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <PasswordResetForm
      navigateTo={navigateTo}
      onBack={() => navigateTo('login')}
    />
  );
};



