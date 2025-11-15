import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  mainContainer: {
    flex: 0.6,
    paddingTop: 32,
  },
  whiteContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '600',
    color: '#333',
  },
  headerSpacer: {
    width: 40,
  },
  formContainer: {
    padding: 24,
    gap: 16,
    paddingBottom: 32,
    height: 170,
  },
  inputWrapper: {
    position: 'relative',
  },
  textInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputLabel: {
    position: 'absolute',
    top: 8,
    left: 6,
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 4,
  },
  registerButton: {
    backgroundColor: '#00C853',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 26,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

