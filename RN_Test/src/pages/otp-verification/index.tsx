import React from 'react';
import { OTPForm } from '../../features/auth/otp-verification';
import { useNavigation } from '../../shared/lib/react-navigation/hooks';

export const OTPVerificationPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <OTPForm
      navigateTo={navigateTo}
      onBack={() => navigateTo('register')}
    />
  );
};




