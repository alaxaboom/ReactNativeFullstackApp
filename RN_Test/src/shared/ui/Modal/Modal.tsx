import React from 'react';
import { Modal as RNModal, View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  transparent?: boolean;
  animationType?: 'none' | 'slide' | 'fade';
  style?: ViewStyle;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  transparent = true,
  animationType = 'slide',
  style,
}) => {
  return (
    <RNModal
      visible={visible}
      transparent={transparent}
      animationType={animationType}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View style={[styles.content, style]} onStartShouldSetResponder={() => true}>
          {children}
        </View>
      </TouchableOpacity>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});

