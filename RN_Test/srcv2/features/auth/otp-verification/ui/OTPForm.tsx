import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useOTPVerification } from '../model/useOTPVerification';
import { NavigationFunction } from '../../../../shared/types/navigation';

interface OTPFormProps {
  navigateTo: NavigationFunction;
  onBack: () => void;
}

export const OTPForm: React.FC<OTPFormProps> = ({ navigateTo, onBack }) => {
  const {
    otp,
    timer,
    canResend,
    isSpecialMode,
    setIsSpecialMode,
    displayPhone,
    formatTime,
    handleNumberPress,
    handleBackspace,
    handleResendCode,
  } = useOTPVerification(navigateTo);

  const renderOTPInput = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 30 }}>
        {otp.map((digit, index) => (
          <View key={index} style={{ width: 50, height: 60, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, marginHorizontal: 8, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: '600' }}>{digit}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderKeyboard = () => {
    let numbers: string[];

    if (isSpecialMode) {
      numbers = ['*', '0', '#'];
    } else {
      numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    }

    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingHorizontal: 20, paddingBottom: 20 }}>
        {numbers.map((num, index) => (
          <TouchableOpacity
            key={index}
            style={{ width: '30%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', margin: 5, backgroundColor: '#F5F5F5', borderRadius: 8 }}
            onPress={() => {
              if (isSpecialMode) {
                if (num === '*') {
                  handleBackspace();
                } else if (num !== '#') {
                  handleNumberPress(num);
                }
              } else {
                handleNumberPress(num);
              }
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: '600' }}>
              {isSpecialMode && num === '*' ? '⌫' : num}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={{ width: '30%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', margin: 5, backgroundColor: '#F5F5F5', borderRadius: 8 }}
          onPress={() => setIsSpecialMode(!isSpecialMode)}
        >
          <Text style={{ fontSize: 18, fontWeight: '600' }}>+ * #</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ width: '30%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', margin: 5, backgroundColor: '#F5F5F5', borderRadius: 8 }}
          onPress={() => handleNumberPress('0')}
        >
          <Text style={{ fontSize: 24, fontWeight: '600' }}>0</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ width: '30%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', margin: 5, backgroundColor: '#F5F5F5', borderRadius: 8 }}
          onPress={handleBackspace}
        >
          <Text style={{ fontSize: 24, fontWeight: '600' }}>⌫</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <TouchableOpacity onPress={onBack}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
          </View>

          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={{ fontSize: 24, fontWeight: '600', marginBottom: 12 }}>Enter the sms code</Text>
            <Text style={{ fontSize: 14, color: '#666', textAlign: 'center' }}>
              Enter the code sent to{'\n'}
              {displayPhone || 'your phone'}
            </Text>
          </View>

          {renderOTPInput()}

          <View style={{ alignItems: 'center', marginTop: 20 }}>
            {canResend ? (
              <TouchableOpacity onPress={handleResendCode}>
                <Text style={{ color: '#00C853', fontSize: 14 }}>Send again</Text>
              </TouchableOpacity>
            ) : (
              <Text style={{ color: '#666', fontSize: 14 }}>Send again in {formatTime(timer)}</Text>
            )}
          </View>
        </View>

        <View style={{ flex: 1 }} />
        {renderKeyboard()}
      </View>
    </SafeAreaView>
  );
};


