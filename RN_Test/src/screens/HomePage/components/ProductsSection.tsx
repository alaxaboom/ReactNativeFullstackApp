import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { productsSectionStyles as styles } from '../styles';

const products = [
  { key: 'microloan', image: require('../../../../assets/products/microloan.png') },
  { key: 'pensioner', image: require('../../../../assets/products/pensioner.png') },
  { key: 'installment', image: require('../../../../assets/products/installment.png') },
  { key: 'sonic', image: require('../../../../assets/products/sonic.png') },
  { key: 'quick', image: require('../../../../assets/products/quick.png') },
];

interface ProductsSectionProps {
  onProductSelect: (productKey: string) => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ onProductSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available products</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {products.map(item => (
          <TouchableOpacity
            key={item.key}
            style={styles.card}
            onPress={() => onProductSelect(item.key)}
          >
            <Image source={item.image} style={styles.image} resizeMode="cover" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ProductsSection;