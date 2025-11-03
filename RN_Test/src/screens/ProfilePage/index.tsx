// src/screens/profile/ProfilePage/index.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from '../../components/BottomNavigation';
import { ProfilePageProps } from './types';
import { useProfileService } from './service/profileService';
import AvatarSection from './components/AvatarSection';
import PersonalDataSection from './components/PersonalDataSection';
import SettingsSection from './components/SettingsSection';
import LogoutButton from './components/LogoutButton';
import EditModal from './components/EditModal';
import PhotoModal from './components/PhotoModal';
import { PageStyles as styles } from './styles';
import { UpdateProfileData } from '../../types';
import { useNavigation } from '../../contexts/NavigationContext';
interface FilePayload {
  uri: string;
  type: string;
  name: string;
}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const { navigateTo } = useNavigation();
  const {
    userDetails,
    isLoading,
    isError,
    refetch,
    logout: serviceLogout,
    updateProfile,
    uploadUserAvatar,
  } = useProfileService();

  const [isSwitchOnPhone, setIsSwitchOnPhone] = useState(true);
  const [isSwitchOnEmail, setIsSwitchOnEmail] = useState(true);
  const [editField, setEditField] = useState<'email' | 'phone' | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  useEffect(() => {
    if (userDetails) {
      setIsSwitchOnPhone(!!userDetails.phone);
      setIsSwitchOnEmail(!!userDetails.email);
    }
  }, [userDetails]);

  const handleLogout = () => {
    Alert.alert(
      'Выход',
      'Вы уверены, что хотите выйти?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Выйти',
          style: 'destructive',
          onPress: async () => {
            await serviceLogout();
            navigateTo('firstpage');
          },
        },
      ]
    );
  };

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11 && cleaned.startsWith('387')) {
      return `+${cleaned.substring(0, 3)} ${cleaned.substring(3, 5)} ${cleaned.substring(5, 8)} ${cleaned.substring(8, 11)}`;
    }
    return `+${cleaned}`;
  };

  const openEditModal = (field: 'email' | 'phone') => {
    setEditField(field);
    setEditValue(field === 'email' ? userDetails?.email || '' : userDetails?.phone || '');
  };

  const closeEditModal = () => {
    setEditField(null);
    setEditValue('');
  };

  const handleUpdate = async () => {
    if (!editField || !userDetails) return;

    const updatedData = { [editField]: editValue } as UpdateProfileData;
    const result = await updateProfile(updatedData);
    if (result.success) {
      closeEditModal();
      Alert.alert('Успех', 'Данные успешно обновлены');
    } else {
      Alert.alert('Ошибка', result.error || 'Не удалось обновить данные');
    }
  };

  const handleImageSelected = async (uri: string) => {
    try {
      const formData = new FormData();
      const file: FilePayload = {
        uri,
        type: 'image/jpeg',
        name: 'avatar.jpg',
      };
      formData.append('avatar', file);

      const result = await uploadUserAvatar(formData);
      if (result.success) {
        Alert.alert('Успех', 'Аватар успешно загружен');
      } else {
        Alert.alert('Ошибка', result.error || 'Не удалось загрузить аватар');
      }
    } catch (error) {
      console.error('Avatar upload error:', error);
      Alert.alert('Ошибка', 'Не удалось загрузить аватар');
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <Text>Загрузка...</Text>
      </SafeAreaView>
    );
  }

  if (isError || !userDetails) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <Text>Ошибка загрузки профиля</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <AvatarSection
          avatarUri={
            userDetails.avatarPath
              ? `http://10.0.2.2:3000${userDetails.avatarPath}`
              : undefined
          }
        />

        <View style={styles.section}>
          <PersonalDataSection
            userDetails={userDetails}
            onEditEmail={() => openEditModal('email')}
            onEditPhone={() => openEditModal('phone')}
            onAddPhoto={() => setShowPhotoModal(true)}
            formatPhone={formatPhone}
          />
        </View>

        <View style={styles.section}>
          <SettingsSection
            isSwitchOnPhone={isSwitchOnPhone}
            isSwitchOnEmail={isSwitchOnEmail}
            onTogglePhone={setIsSwitchOnPhone}
            onToggleEmail={setIsSwitchOnEmail}
          />
        </View>

        <View style={styles.section}>
          <LogoutButton onPress={handleLogout} />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <BottomNavigation
        currentScreen="profile"
      />

      <EditModal
        visible={!!editField}
        field={editField}
        value={editValue}
        onChange={setEditValue}
        onClose={closeEditModal}
        onUpdate={handleUpdate}
      />

      <PhotoModal
        visible={showPhotoModal}
        onClose={() => setShowPhotoModal(false)}
        onImageSelected={handleImageSelected}
      />
    </SafeAreaView>
  );
};

export default ProfilePage;