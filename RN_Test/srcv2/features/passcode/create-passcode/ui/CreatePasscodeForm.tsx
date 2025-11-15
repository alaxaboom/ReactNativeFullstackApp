import React from 'react';
import { SafeAreaView, StatusBar, View, Text, StyleSheet } from 'react-native';
import { useCreatePasscode } from '../model/useCreatePasscode';
import { PasscodeInput } from './PasscodeInput';
import { PasscodeKeyboard } from './PasscodeKeyboard';
import { StepIndicator } from './StepIndicator';
import { TitleSection } from './TitleSection';
import { NavigationFunction } from '../../../../shared/types/navigation';

interface CreatePasscodeFormProps {
  navigateTo: NavigationFunction;
}

export const CreatePasscodeForm: React.FC<CreatePasscodeFormProps> = ({ navigateTo }) => {
  const {
    passcode,
    title,
    subtitle,
    currentStepIndex,
    handleNumberPress,
    handleBackspace,
  } = useCreatePasscode(navigateTo);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <View style={styles.whiteCard}>
        <TitleSection title={title} subtitle={subtitle} />
        <PasscodeInput passcode={passcode} />
        {currentStepIndex === 2 && (
          <Text style={styles.helperText}>
            Re-enter the passcode you just created
          </Text>
        )}
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
  helperText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});


