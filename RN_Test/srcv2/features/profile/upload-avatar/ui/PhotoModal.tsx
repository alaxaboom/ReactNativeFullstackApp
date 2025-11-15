import React from 'react';
import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import { launchCamera, launchImageLibrary, type ImagePickerResponse } from 'react-native-image-picker';
import { styles } from './PhotoModal.styles';

interface PhotoModalProps {
  visible: boolean;
  onClose: () => void;
  onImageSelected: (uri: string) => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({ visible, onClose, onImageSelected }) => {
  if (!visible) return null;

  const takePhoto = () => {
    const options = {
      mediaType: 'photo' as const,
      includeBase64: false,
      maxHeight: 800,
      maxWidth: 800,
    };

    launchCamera(options, handleImageResponse);
  };

  const pickFromGallery = () => {
    const options = {
      mediaType: 'photo' as const,
      includeBase64: false,
      maxHeight: 800,
      maxWidth: 800,
    };

    launchImageLibrary(options, handleImageResponse);
  };

  const handleImageResponse = (response: ImagePickerResponse) => {
    onClose();

    if (response.didCancel) {
      return;
    }

    if (response.errorCode) {
      Alert.alert('Error', response.errorMessage || 'Unknown error when selecting photo');
      return;
    }

    const uri = response.assets?.[0]?.uri;
    if (uri) {
      onImageSelected(uri);
    } else {
      Alert.alert('Error', 'Failed to get image URI');
    }
  };

  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.photoModal}>
          <View style={styles.modalDragBar} />
          <TouchableOpacity style={styles.photoModalButton} onPress={takePhoto}>
            <Text style={styles.photoModalButtonText}>Take photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.photoModalButton} onPress={pickFromGallery}>
            <Text style={styles.photoModalButtonText}>Choose from gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.photoModalCancelButton} onPress={onClose}>
            <Text style={styles.photoModalCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

