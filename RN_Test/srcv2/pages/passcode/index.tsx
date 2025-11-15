import React from 'react';
import { CreatePasscodeForm } from '../../features/passcode/create-passcode';
import { EnterPasscodeForm } from '../../features/passcode/enter-passcode';
import { useNavigation } from '../../shared/lib/react-navigation/hooks';

interface PasscodePageProps {
  mode?: 'create' | 'enter';
}

export const PasscodePage: React.FC<PasscodePageProps> = ({ mode = 'create' }) => {
  const { navigateTo } = useNavigation();

  if (mode === 'enter') {
    return <EnterPasscodeForm navigateTo={navigateTo} />;
  }

  return <CreatePasscodeForm navigateTo={navigateTo} />;
};



