import React from 'react';
import { EnableBiometricsForm } from '../../features/biometrics/enable-biometrics';
import { useNavigation } from '../../shared/lib/react-navigation/hooks';

export const BiometricsPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return <EnableBiometricsForm navigateTo={navigateTo} />;
};


