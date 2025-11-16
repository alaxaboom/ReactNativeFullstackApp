import React from 'react';
import { LoginForm } from '../../features/auth/login';
import { useNavigation } from '../../shared/lib/react-navigation/hooks';

export const LoginPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <LoginForm
      navigateTo={navigateTo}
      onBack={() => navigateTo('firstpage')}
    />
  );
};




