import React from 'react';
import { View, Text, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

interface AvatarSectionProps {
  avatarUri?: string;
}

export const AvatarSection: React.FC<AvatarSectionProps> = ({ avatarUri }) => {
  const renderAvatarPlaceholder = () => (
    <View style={styles.avatarPlaceholder}>
      <Ionicons name="camera" size={24} color="#999" />
    </View>
  );

  const renderAvatar = () => {
    if (!avatarUri) return renderAvatarPlaceholder();
    return <Image source={{ uri: avatarUri }} style={styles.avatar} resizeMode="cover" />;
  };

  return (
    <View style={styles.avatarContainer}>
      {renderAvatar()}
      <Text style={styles.headerTitle}>Profile</Text>
    </View>
  );
};

