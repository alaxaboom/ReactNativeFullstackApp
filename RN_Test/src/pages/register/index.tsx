import React from 'react';
import { RegisterForm } from '../../features/auth/register';
import { useNavigation } from '../../shared/lib/react-navigation/hooks';

export const RegisterPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <RegisterForm
      navigateTo={navigateTo}
      onBack={() => navigateTo('login')}
    />
  );
};




