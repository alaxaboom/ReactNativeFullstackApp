import React from 'react';
import { SafeAreaView, StatusBar, View, StyleSheet } from 'react-native';
import { useEnableBiometrics } from '../model/useEnableBiometrics';
import { BiometricsIcon } from './BiometricsIcon';
import { TitleSection } from './TitleSection';
import { ActionButtons } from './ActionButtons';
import { NavigationFunction } from '../../../../shared/types/navigation';

interface EnableBiometricsFormProps {
  navigateTo: NavigationFunction;
}

export const EnableBiometricsForm: React.FC<EnableBiometricsFormProps> = ({ navigateTo }) => {
  const {
    isLoading,
    handleUseBiometrics,
    handleSkip,
  } = useEnableBiometrics(navigateTo);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <View style={styles.whiteCard}>
        <BiometricsIcon />
        <TitleSection />
        <ActionButtons
          isLoading={isLoading}
          onUseBiometrics={handleUseBiometrics}
          onSkip={handleSkip}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  whiteCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 42,
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 120,
    flex: 1,
    justifyContent: 'center',
  },
});




