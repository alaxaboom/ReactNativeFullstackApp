import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { User } from '../../../types';
import { userHeaderStyles as styles } from '../styles';
import { useNavigation } from '../../../contexts/NavigationContext';

interface UserHeaderProps {
  user: User | null;
}

const UserHeader: React.FC<UserHeaderProps> = ({ user }) => {
  const { navigateTo } = useNavigation();
  const handleProfile = () => navigateTo('profile');

  const getUserDisplayName = () => {
    if (!user) return 'User';
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.firstName || 'User';
  };

  const getAvatarSource = () => {
    if (user?.avatarPath) {
      return { uri: user.avatarPath };
    }
    return undefined;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleProfile} style={styles.avatarContainer}>
        {getAvatarSource() ? (
          <Image 
            source={getAvatarSource()!} 
            style={styles.avatarImage}
            resizeMode="cover"
          />
        ) : (
          <Ionicons name="person-circle-outline" size={40} color="#00C853" />
        )}
      </TouchableOpacity>
      <View style={styles.nameAndButtonContainer}>
        <TouchableOpacity onPress={handleProfile}>
          <Text style={styles.userName}>{getUserDisplayName()}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.showAllButton} onPress={() => navigateTo('products', { tab: 'loans' })}>
          <Text style={styles.showAllText}>Show All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserHeader;