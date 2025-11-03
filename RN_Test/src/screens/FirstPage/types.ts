import { ViewStyle } from 'react-native';
export interface FirstPageProps {}

export interface BenefitCardProps {
  text: string;
  style?: ViewStyle;
}

export interface ActionButtonProps {
  iconName: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  style?: ViewStyle;
}