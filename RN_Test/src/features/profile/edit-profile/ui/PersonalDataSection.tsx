import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

interface PersonalDataSectionProps {
  userDetails: {
    firstName?: string;
    lastName?: string;
    jmbg?: string;
    email?: string | null;
    phone?: string;
    residentialAddress?: string;
  };
  onEditEmail: () => void;
  onEditPhone: () => void;
  onAddPhoto: () => void;
  formatPhone: (phone: string) => string;
}

export const PersonalDataSection: React.FC<PersonalDataSectionProps> = ({
  userDetails,
  onEditEmail,
  onEditPhone,
  onAddPhoto,
  formatPhone,
}) => {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.sectionTitle}>Personal data</Text>

      <View style={styles.infoRowHorizontal}>
        <Text style={styles.infoLabel}>Name</Text>
        <Text style={styles.infoValue}>{userDetails.firstName || 'not yet added'}</Text>
      </View>

      <View style={styles.infoRowHorizontal}>
        <Text style={styles.infoLabel}>Last name</Text>
        <Text style={styles.infoValue}>{userDetails.lastName || 'not yet added'}</Text>
      </View>

      <View style={styles.infoRowHorizontal}>
        <Text style={styles.infoLabel}>JMBG</Text>
        <Text style={styles.infoValue}>
          {userDetails.jmbg
            ? userDetails.jmbg.replace(/(\d{4})(\d{4})(\d{4})(\d{1})/, '$1 $2 $3 $4')
            : 'not yet added'}
        </Text>
      </View>

      <View style={styles.infoRowVertical}>
        <Text style={styles.infoLabel}>Email</Text>
        <View style={styles.editableValueContainer}>
          <Text style={styles.infoValue}>{userDetails.email || 'not yet added'}</Text>
          <TouchableOpacity onPress={onEditEmail}>
            <View style={styles.editIconContainer}>
              <Ionicons name="create-outline" size={16} color="#333" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoRowVertical}>
        <Text style={styles.infoLabel}>Phone number</Text>
        <View style={styles.editableValueContainer}>
          <Text style={styles.infoValue}>
            {userDetails.phone ? formatPhone(userDetails.phone) : 'not yet added'}
          </Text>
          <TouchableOpacity onPress={onEditPhone}>
            <View style={styles.editIconContainer}>
              <Ionicons name="create-outline" size={16} color="#333" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoRowVertical}>
        <Text style={styles.infoLabel}>Residential address</Text>
        <Text style={styles.infoValue}>{userDetails.residentialAddress || 'not yet added'}</Text>
      </View>
      <View style={styles.profilePictureSection}>
        <Text style={styles.profilePictureLabel}>Profile picture</Text>
        <TouchableOpacity style={styles.addPhotoButton} onPress={onAddPhoto}>
          <Text style={styles.addPhotoButtonText}>+ Add photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

