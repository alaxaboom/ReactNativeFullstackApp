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
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fafafa',
  },
  question: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  toggleIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  content: {
    padding: 16,
    backgroundColor: '#fff',
  },
  answer: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
});

