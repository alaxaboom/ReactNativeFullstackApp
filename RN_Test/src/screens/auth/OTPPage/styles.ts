import { StyleSheet } from 'react-native';

export const otpPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  whiteContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 34,
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
  },
  backButton: {
    padding: 8,
  },
  headerSpacer: {
    flex: 1,
  },
  titleSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  otpText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  keyboardSpacer: {
    height: 30,
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: '#F0F0F0',
  },
  keyboardButton: {
    width: '30%',
    aspectRatio: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1.5%',
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  keyboardButtonText: {
    fontSize: 24,
    fontWeight: '400',
    color: '#333',
  },
  keyboardSubText: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
});