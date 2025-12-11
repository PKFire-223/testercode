// src/components/ProductCard.tsx
// Bùi Trương Nhật Quang 23521276
import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Product } from "../api/products";

interface Props {
  product: Product;
  onPress: () => void;
  onAdd: () => void;
}

export default function ProductCard({ product, onPress, onAdd }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text numberOfLines={2} style={styles.title}>
        {product.title}
      </Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <View style={styles.footerRow}>
        <Text style={styles.rating}>
          ⭐ {product.rating.rate} ({product.rating.count})
        </Text>
        <TouchableOpacity onPress={onAdd}>
          <Ionicons name="add-circle" size={24} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 2,
  },
  image: {
    height: 120,
    resizeMode: "contain",
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    marginBottom: 4,
  },
  price: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: {
    fontSize: 11,
  },
});
