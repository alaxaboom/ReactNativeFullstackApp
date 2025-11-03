import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { EditModalStyles as styles } from '../styles';

interface EditModalProps {
  visible: boolean;
  field: 'email' | 'phone' | null;
  value: string;
  onChange: (text: string) => void;
  onClose: () => void;
  onUpdate: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  visible,
  field,
  value,
  onChange,
  onClose,
  onUpdate,
}) => {
  if (!visible || !field) return null;

  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.editModal}>
          <View style={styles.modalDragBar} />
          <TextInput
            style={styles.modalInput}
            value={value}
            onChangeText={onChange}
            placeholder={field === 'email' ? 'Enter email' : 'Enter phone number'}
            keyboardType={field === 'email' ? 'email-address' : 'phone-pad'}
          />
          <View style={styles.modalButtonRow}>
            <TouchableOpacity style={styles.modalCancelButton} onPress={onClose}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalUpdateButton} onPress={onUpdate}>
              <Text style={styles.modalUpdateText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditModal;