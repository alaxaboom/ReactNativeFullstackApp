import { StyleSheet } from 'react-native';

export const pageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 26,
    paddingTop: 46,
    marginBottom: 30,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
  },
});

export const contactGroupStyles = StyleSheet.create({
  groupedContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  groupedContactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 19,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 16,
  },
});

export const contactItemStyles = StyleSheet.create({
  contactItem: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 30,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactLabel: {
    fontSize: 18,
    marginLeft: 11,
    color: '#333',
  },
  contactValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactValue: {
    fontSize: 16,
    marginRight: 11,
    color: '#333',
  },
});

export const callBackButtonStyles = StyleSheet.create({
  callBackButton: {
    backgroundColor: '#00C853',
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 15,
    paddingHorizontal: 19,
    borderRadius: 8,
    alignItems: 'center',
  },
  callBackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});