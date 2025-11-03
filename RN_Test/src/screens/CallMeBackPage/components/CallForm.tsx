import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { callFormStyles } from '../styles';

type CallFormProps = {
  name: string;
  phone: string;
  callTime: 'immediately' | 'schedule';
  date: string;
  time: string;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setCallTime: (callTime: 'immediately' | 'schedule') => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

const CallForm: React.FC<CallFormProps> = ({
  name,
  phone,
  callTime,
  date,
  time,
  setName,
  setPhone,
  setCallTime,
  setDate,
  setTime,
  onSubmit,
  onCancel,
}) => {
  return (
    <>
      <Text style={callFormStyles.title}>We are here to help if you need it</Text>
      <Text style={callFormStyles.subtitle}>
        Leave your phone number and we will call you in 15 minutes if it is working hours, or schedule a call yourself when it suits you.
      </Text>

      <Text style={callFormStyles.sectionTitle}>When do you want us to call you?</Text>
      <View style={callFormStyles.toggleContainer}>
        <TouchableOpacity
          style={[callFormStyles.toggleButton, callTime === 'immediately' && callFormStyles.activeToggle]}
          onPress={() => setCallTime('immediately')}
        >
          <Text style={[callFormStyles.toggleText, callTime === 'immediately' && callFormStyles.activeToggleText]}>
            Immediately
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[callFormStyles.toggleButton, callTime === 'schedule' && callFormStyles.activeToggle]}
          onPress={() => setCallTime('schedule')}
        >
          <Text style={[callFormStyles.toggleText, callTime === 'schedule' && callFormStyles.activeToggleText]}>
            Schedule a call
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={callFormStyles.input}
        placeholder="Your name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={callFormStyles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      {callTime === 'schedule' && (
        <>
          <View style={callFormStyles.dropdownContainer}>
            <TextInput
              style={callFormStyles.dropdownInput}
              placeholder="24 June 2024 (Monday)"
              value={date}
              onChangeText={setDate}
              editable={false}
            />
            <Text style={callFormStyles.dropdownArrow}>▼</Text>
          </View>
          <View style={callFormStyles.dropdownContainer}>
            <TextInput
              style={callFormStyles.dropdownInput}
              placeholder="Time: 08:00"
              value={time}
              onChangeText={setTime}
              editable={false}
            />
            <Text style={callFormStyles.dropdownArrow}>▼</Text>
          </View>
        </>
      )}

      <TouchableOpacity style={callFormStyles.submitButton} onPress={onSubmit}>
        <Text style={callFormStyles.submitButtonText}>Send a request</Text>
      </TouchableOpacity>

      <TouchableOpacity style={callFormStyles.cancelButton} onPress={onCancel}>
        <Text style={callFormStyles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </>
  );
};

export default CallForm;