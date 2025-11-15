import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { getAllProducts } from '../../../entities/product';
import { productsSectionStyles as styles } from '../styles';

interface ProductsSectionProps {
  onProductSelect: (productKey: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onProductSelect }) => {
  const products = getAllProducts();

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
            <Image source={item.imagePath} style={styles.image} resizeMode="cover" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};


