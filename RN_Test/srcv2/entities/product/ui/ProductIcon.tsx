import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ProductIcon as ProductIconType } from '../model/productTypes';

interface ProductIconProps {
  iconName: ProductIconType;
  size?: number;
  color?: string;
}

export const ProductIcon: React.FC<ProductIconProps> = ({
  iconName,
  size = 24,
  color = '#999',
}) => {
  switch (iconName) {
    case 'elderly':
      return <MaterialIcons name="elderly" size={size} color={color} />;
    case 'flash':
    case 'card':
    case 'headset':
    case 'rocket':
      return <Ionicons name={iconName} size={size} color={color} />;
    default:
      return null;
  }
};

