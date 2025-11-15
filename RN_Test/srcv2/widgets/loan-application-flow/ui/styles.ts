import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  screenHeader: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 8,
    backgroundColor: 'white',
  },
  screenTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  screenBody: {
    flex: 1,
    paddingHorizontal: 26,
    paddingBottom: 6,
  },
  screenSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 42,
    paddingHorizontal: 30,
  },
  stepContent: {
    padding: 0,
  },
  bottomSpacer: {
    height: 20,
  },
  continueButtonWrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  continueButton: {
    backgroundColor: '#00C853',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 32,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 24,
  },
  modalCloseButton: {
    backgroundColor: '#00C853',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

