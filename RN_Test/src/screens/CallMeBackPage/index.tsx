import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  View,
} from 'react-native';
import CallForm from './components/CallForm';
import SuccessScreen from './components/SuccessScreen';
import { modalStyles } from './styles';

type CallMeBackPageProps = {
  visible: boolean;
  onClose: () => void;
};

const CallMeBackPage: React.FC<CallMeBackPageProps> = ({ visible, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [callTime, setCallTime] = useState<'immediately' | 'schedule'>('immediately');
  const [date, setDate] = useState('24 June 2024 (Monday)');
  const [time, setTime] = useState('08:00');

  const handleSubmit = () => {
    console.log({ name, phone, callTime, date, time });
    setTimeout(() => {
      setStep('success');
    }, 500);
  };

  const handleGotIt = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={modalStyles.overlay}>
        <View style={modalStyles.modalContainer}>
          <ScrollView
            contentContainerStyle={modalStyles.content}
            showsVerticalScrollIndicator={false}
          >
            {step === 'form' ? (
              <CallForm
                name={name}
                phone={phone}
                callTime={callTime}
                date={date}
                time={time}
                setName={setName}
                setPhone={setPhone}
                setCallTime={setCallTime}
                setDate={setDate}
                setTime={setTime}
                onSubmit={handleSubmit}
                onCancel={onClose}
              />
            ) : (
              <SuccessScreen onGotIt={handleGotIt} />
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CallMeBackPage;