import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  photoModal: {
    backgroundColor: 'white',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  modalDragBar: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  photoModalButton: {
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  photoModalButtonText: {
    fontSize: 16,
    color: '#333',
  },
  photoModalCancelButton: {
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  photoModalCancelText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
});

