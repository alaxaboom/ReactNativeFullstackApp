import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  headerSafeArea: {
    paddingTop: 60,
    paddingBottom: 20,
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  headerSection: {
    marginBottom: 20,
  },
  headerTop: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
    opacity: 0.9,
  },
  benefitsContainer: {
    marginHorizontal: 25,
  },
  benefitsRow: {
    flexDirection: 'row',
  },
  benefitCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  topLeft: {
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderRightWidth: 0.25,
    borderBottomWidth: 0.25,
  },
  topRight: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0.25,
    borderBottomWidth: 0.25,
  },
  bottomLeft: {
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0.25,
    borderTopWidth: 0.25,
  },
  bottomRight: {
    borderBottomRightRadius: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0.25,
    borderTopWidth: 0.25,
  },
  contentSection: {
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 20,
    paddingTop: 35,
    marginTop: 45,
    overflow: 'hidden',
    width: '100%',
    paddingBottom: 80,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: (width - 64) / 2,
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  loginSection: {
    alignItems: 'center',
  },
  loginPrompt: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#00C853',
    borderRadius: 16,
    paddingHorizontal: 48,
    paddingVertical: 20,
    width: width - 58,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomNavContainer: {
    backgroundColor: 'white',
  },
});




