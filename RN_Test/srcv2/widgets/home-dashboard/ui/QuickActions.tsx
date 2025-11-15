import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { quickActionsStyles as styles } from '../styles';

interface QuickActionsProps {
  onApplicationsList: () => void;
  onCallMeBack: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onApplicationsList, onCallMeBack }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onApplicationsList}>
        <View style={styles.iconContainer}>
          <Ionicons name="document-text-outline" size={28} color="white" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>My applications</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onCallMeBack}>
        <View style={styles.iconContainer}>
          <Ionicons name="call-sharp" size={28} color="white" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Call me back</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};


