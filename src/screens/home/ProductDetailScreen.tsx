// src/screens/home/ProductDetailScreen.tsx
// Bùi Trương Nhật Quang 23521276
import React, { useLayoutEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { Product } from "../../api/products";

export default function ProductDetailScreen() {
  const route = useRoute<RouteProp<any>>();
  const navigation = useNavigation();
  const { product } = route.params as { product: Product };

  useLayoutEffect(() => {
    navigation.setOptions({ title: product.title });
  }, [navigation, product.title]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.rating}>
        ⭐ {product.rating.rate} ({product.rating.count} reviews)
      </Text>
      <Text style={styles.desc}>{product.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginBottom: 16,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  price: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  rating: { marginBottom: 12 },
  desc: { fontSize: 14, lineHeight: 20 },
});
