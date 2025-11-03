import { StyleSheet } from 'react-native';

export const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  whiteCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 42,
    alignItems: 'center',
    marginBottom: 8,
    marginTop:120,
    flex: 1,
    justifyContent: 'center',
  },
});

export const titleSectionStyles = StyleSheet.create({
  titleSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export const stepIndicatorStyles = StyleSheet.create({
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 60,
    gap: 12,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export const passcodeInputStyles = StyleSheet.create({
  passcodeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 16,
  },
  passcodeCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  passcodeCircleFilled: {
    backgroundColor: '#00C853',
  },
});

export const passcodeKeyboardStyles = StyleSheet.create({
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop:70,
    marginBottom:-80
  },
  keyboardButton: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1.5%',
  },
  emptyButton: {
    backgroundColor: 'transparent',
  },
  keyboardButtonText: {
    fontSize: 32,
    fontWeight: '300',
    color: '#333',
  },
});

export const helperTextStyles = StyleSheet.create({
  helperText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});