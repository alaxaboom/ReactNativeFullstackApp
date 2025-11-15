import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { ProductIcon } from '../../../../entities/product';
import { LoanProductKey } from '../../../../shared/types';
import { getAllProducts } from '../../../../entities/product';

const { width } = Dimensions.get('window');

interface ProductCardProps {
  productKey: LoanProductKey;
  isSelected: boolean;
  onSelect: (key: LoanProductKey) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ productKey, isSelected, onSelect }) => {
  const products = getAllProducts();
  const product = products.find(p => p.key === productKey);

  if (!product) return null;

  return (
    <TouchableOpacity
      style={[styles.productCard, isSelected && styles.productCardSelected]}
      onPress={() => onSelect(productKey)}
    >
      <View style={[styles.productIcon, isSelected && styles.productIconSelected]}>
        <ProductIcon iconName={product.icon} size={24} color={isSelected ? "#00C853" : "#999"} />
      </View>
      <Text style={styles.productTitle} numberOfLines={2} ellipsizeMode="tail">
        {product.title}
      </Text>
    </TouchableOpacity>
  );
};

export const ProductSelectionGrid: React.FC<{
  selectedProduct: LoanProductKey;
  onSelect: (key: LoanProductKey) => void;
}> = ({ selectedProduct, onSelect }) => {
  const products = getAllProducts();

  return (
    <View style={styles.productGrid}>
      {products.map((product) => (
        <ProductCard
          key={product.key}
          productKey={product.key}
          isSelected={selectedProduct === product.key}
          onSelect={onSelect}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: (width - 80) / 2,
    height: 140,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginBottom: 16,
  },
  productCardSelected: {
    borderColor: '#00C853',
  },
  productIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  productIconSelected: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#00C853',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
});

