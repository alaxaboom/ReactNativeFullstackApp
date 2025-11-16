import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const userHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  avatarContainer: {
    marginRight: 12,
    marginTop: 4,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  nameAndButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  showAllButton: {
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  showAllText: {
    color: '#00C853',
    fontSize: 18,
    fontWeight: '600',
  },
});

export const quickActionsStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  button: {
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
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 16,
    backgroundColor: '#00C853',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  textContainer: {},
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
});

export const homePageStyles = StyleSheet.create({
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
    position: 'relative',
  },
  stepIndicatorDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CCCCCC',
    marginHorizontal: 4,
  },
  activeStepIndicator: {
    backgroundColor: '#00C853',
  },
});

export const productsSectionStyles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  scroll: {
    paddingHorizontal: 4,
  },
  card: {
    width: 170,
    height: 220,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

