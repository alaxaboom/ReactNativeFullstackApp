import { StyleSheet } from 'react-native';

export const callFormStyles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 17,
    color: '#999',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  activeToggle: {
    backgroundColor: '#fff',
    borderColor: '#00C853',
  },
  toggleText: {
    fontSize: 14,
    color: '#333',
  },
  activeToggleText: {
    color: '#00C853',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
  },
  dropdownContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  dropdownInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
  },
  dropdownArrow: {
    position: 'absolute',
    right: 15,
    top: 15,
    fontSize: 16,
    color: '#666',
  },
  submitButton: {
    backgroundColor: '#00C853',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#00C853',
    fontSize: 16,
  },
});

export const successScreenStyles = StyleSheet.create({
  successIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  checkmark: {
    fontSize: 30,
    color: '#00C853',
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  successSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  gotItButton: {
    backgroundColor: '#00C853',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  gotItText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '98%',
  },
  content: {
    flex: 1,
    padding: 30,
    paddingTop: 50,
  },
});