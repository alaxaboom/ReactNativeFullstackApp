import React from 'react';
import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import { launchCamera, launchImageLibrary, type ImagePickerResponse } from 'react-native-image-picker';
import { PhotoModalStyles as styles } from '../styles';

interface PhotoModalProps {
  visible: boolean;
  onClose: () => void;
  onImageSelected: (uri: string) => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ visible, onClose, onImageSelected }) => {
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
      console.log('Пользователь отменил выбор изображения');
      return;
    }

    if (response.errorCode) {
      Alert.alert('Ошибка', response.errorMessage || 'Неизвестная ошибка при выборе фото');
      return;
    }

    const uri = response.assets?.[0]?.uri;
    if (uri) {
      onImageSelected(uri);
    } else {
      Alert.alert('Ошибка', 'Не удалось получить URI изображения');
    }
  };

  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.photoModal}>
          <View style={styles.modalDragBar} />
          <TouchableOpacity style={styles.photoModalButton} onPress={takePhoto}>
            <Text style={styles.photoModalButtonText}>Сделать фото</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.photoModalButton} onPress={pickFromGallery}>
            <Text style={styles.photoModalButtonText}>Выбрать из галереи</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.photoModalCancelButton} onPress={onClose}>
            <Text style={styles.photoModalCancelText}>Отмена</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PhotoModal;