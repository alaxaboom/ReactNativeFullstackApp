import React, { useState } from 'react';
import { Modal, ScrollView, View } from 'react-native';
import { CallForm } from './CallForm';
import { SuccessScreen } from './SuccessScreen';
import { styles } from './styles';

interface CallMeBackModalProps {
  visible: boolean;
  onClose: () => void;
}

export const CallMeBackModal: React.FC<CallMeBackModalProps> = ({ visible, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [callTime, setCallTime] = useState<'immediately' | 'schedule'>('immediately');
  const [date, setDate] = useState('24 June 2024 (Monday)');
  const [time, setTime] = useState('08:00');

  const handleSubmit = () => {
    setTimeout(() => {
      setStep('success');
    }, 500);
  };

  const handleGotIt = () => {
    setStep('form');
    setName('');
    setPhone('');
    setCallTime('immediately');
    setDate('24 June 2024 (Monday)');
    setTime('08:00');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView
            contentContainerStyle={styles.content}
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

