import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  content: {
    padding: 20,
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  successContainer: {
    padding: 20,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    color: '#00C853',
  },
  successText: {
    fontSize: 16,
    color: '#666',
  },
});




