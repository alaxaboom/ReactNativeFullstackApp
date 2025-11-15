import React from 'react';
import { View, Text, Switch } from 'react-native';
import { styles } from './styles';

interface SettingsSectionProps {
  isSwitchOnPhone: boolean;
  isSwitchOnEmail: boolean;
  onTogglePhone: (value: boolean) => void;
  onToggleEmail: (value: boolean) => void;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  isSwitchOnPhone,
  isSwitchOnEmail,
  onTogglePhone,
  onToggleEmail,
}) => {
  return (
    <View style={styles.settingsCard}>
      <Text style={styles.sectionTitle}>Settings</Text>

      <View style={styles.settingRow}>
        <Switch
          value={isSwitchOnPhone}
          onValueChange={onTogglePhone}
          trackColor={{ false: '#767577', true: '#00C853' }}
          thumbColor={isSwitchOnPhone ? '#fff' : '#f4f3f4'}
        />
        <Text style={styles.settingLabel}>Receive marketing offers on my phone</Text>
      </View>

      <View style={styles.settingRow}>
        <Switch
          value={isSwitchOnEmail}
          onValueChange={onToggleEmail}
          trackColor={{ false: '#767577', true: '#00C853' }}
          thumbColor={isSwitchOnEmail ? '#fff' : '#f4f3f4'}
        />
        <Text style={styles.settingLabel}>Receive marketing offers to my email</Text>
      </View>
    </View>
  );
};

