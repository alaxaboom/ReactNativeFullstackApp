import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User } from '../../../shared/types';

interface UserCardProps {
  user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
      <Text style={styles.phone}>{user.phone}</Text>
      {user.email && <Text style={styles.email}>{user.email}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
});

