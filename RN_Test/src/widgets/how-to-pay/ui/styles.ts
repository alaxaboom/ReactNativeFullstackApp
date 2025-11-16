import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 0,
    paddingBottom: 100,
  },
  mainCard: {
    backgroundColor: '#fff',
    borderRadius: 0,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  grayContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  grayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  grayRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  grayLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    width: 120,
  },
  grayValue: {
    fontSize: 14,
    color: '#000',
    flex: 1,
    textAlign: 'left',
  },
  alertContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 20,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  exclamationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFC107',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exclamationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  alertText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
});

