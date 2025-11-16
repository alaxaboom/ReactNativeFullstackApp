import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './styles';

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

export const CallForm: React.FC<CallFormProps> = ({
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
      <Text style={styles.title}>We are here to help if you need it</Text>
      <Text style={styles.subtitle}>
        Leave your phone number and we will call you in 15 minutes if it is working hours, or schedule a call yourself when it suits you.
      </Text>

      <Text style={styles.sectionTitle}>When do you want us to call you?</Text>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, callTime === 'immediately' && styles.activeToggle]}
          onPress={() => setCallTime('immediately')}
        >
          <Text style={[styles.toggleText, callTime === 'immediately' && styles.activeToggleText]}>
            Immediately
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, callTime === 'schedule' && styles.activeToggle]}
          onPress={() => setCallTime('schedule')}
        >
          <Text style={[styles.toggleText, callTime === 'schedule' && styles.activeToggleText]}>
            Schedule a call
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Your name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      {callTime === 'schedule' && (
        <>
          <View style={styles.dropdownContainer}>
            <TextInput
              style={styles.dropdownInput}
              placeholder="24 June 2024 (Monday)"
              value={date}
              onChangeText={setDate}
              editable={false}
            />
            <Text style={styles.dropdownArrow}>▼</Text>
          </View>
          <View style={styles.dropdownContainer}>
            <TextInput
              style={styles.dropdownInput}
              placeholder="Time: 08:00"
              value={time}
              onChangeText={setTime}
              editable={false}
            />
            <Text style={styles.dropdownArrow}>▼</Text>
          </View>
        </>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitButtonText}>Send a request</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </>
  );
};

