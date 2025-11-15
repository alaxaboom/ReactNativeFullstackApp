import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetMeQuery } from '../../../../entities/user';
import { LoadingScreen } from '../../../../widgets/loading-screen';
import { LogoutButton } from '../../../auth/logout';
import { useNavigation } from '../../../../shared/lib/react-navigation/hooks';
import { AvatarSection, PhotoModal } from '../../upload-avatar';
import { PersonalDataSection, SettingsSection, EditProfileModal } from '../../edit-profile';
import { useEditProfile } from '../../edit-profile/model';
import { useUploadAvatar } from '../../upload-avatar/model';
import { UpdateProfileData } from '../../../../shared/types';
import { formatPhoneDisplay } from '../../../../shared/utils/phoneUtils';
import { styles } from './styles';

interface FilePayload {
  uri: string;
  type: string;
  name: string;
}

export const ProfileView: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { data: userDetails, isLoading, isError } = useGetMeQuery();
  const { updateProfile } = useEditProfile();
  const { uploadUserAvatar } = useUploadAvatar();

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
      Alert.alert('Success', 'Data updated successfully');
    } else {
      Alert.alert('Error', result.error || 'Failed to update data');
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
        Alert.alert('Success', 'Avatar uploaded successfully');
      } else {
        Alert.alert('Error', result.error || 'Failed to upload avatar');
      }
    } catch (error) {
      console.error('Avatar upload error:', error);
      Alert.alert('Error', 'Failed to upload avatar');
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (isError || !userDetails) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <Text>Error loading profile</Text>
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
            formatPhone={formatPhoneDisplay}
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
          <LogoutButton navigateTo={navigateTo} />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <EditProfileModal
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

