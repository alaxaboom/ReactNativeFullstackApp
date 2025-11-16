import React from 'react';
import { SafeAreaView, StatusBar, View, StyleSheet } from 'react-native';
import { useEnterPasscode } from '../model/useEnterPasscode';
import { PasscodeInput } from '../../create-passcode/ui/PasscodeInput';
import { PasscodeKeyboard } from '../../create-passcode/ui/PasscodeKeyboard';
import { TitleSection } from '../../create-passcode/ui/TitleSection';
import { NavigationFunction } from '../../../../shared/types/navigation';

interface EnterPasscodeFormProps {
  navigateTo: NavigationFunction;
}

export const EnterPasscodeForm: React.FC<EnterPasscodeFormProps> = ({ navigateTo }) => {
  const {
    passcode,
    handleNumberPress,
    handleBackspace,
  } = useEnterPasscode(navigateTo);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <View style={styles.whiteCard}>
        <TitleSection title="Enter passcode" subtitle="Enter your passcode to continue" />
        <PasscodeInput passcode={passcode} />
      </View>
      <PasscodeKeyboard onNumberPress={handleNumberPress} onBackspace={handleBackspace} />
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




