// src/screens/home/HomeScreen.tsx
// Bùi Trương Nhật Quang 23521276
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BannerCarousel from "../../components/BannerCarousel";
import ProductCard from "../../components/ProductCard";
import LoadingOverlay from "../../components/LoadingOverlay";
import { getAllProducts, Product } from "../../api/products";
import { useCartStore } from "../../store/cartStore";

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [hotDeals, setHotDeals] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllProducts();
        const mid = Math.floor(data.length / 2);
        setHotDeals(data.slice(0, mid));
        setNewArrivals(data.slice(mid));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const bannerImages = [
    "https://picsum.photos/800/400?1",
    "https://picsum.photos/800/400?2",
    "https://picsum.photos/800/400?3",
  ];

  const handleAdd = useCallback(
    (p: Product) => {
      const ok = addItem(p);
      if (!ok) {
        Alert.alert("Already in cart", "This product is already added.");
      }
    },
    [addItem]
  );

  const renderHotItem = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
      onAdd={() => handleAdd(item)}
    />
  );

  const renderNewItem = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
      onAdd={() => handleAdd(item)}
    />
  );

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList<Product>
        data={hotDeals}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={renderHotItem}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.slogan}>Find the best products for you</Text>
            <BannerCarousel images={bannerImages} />
            <Text style={styles.sectionTitle}>Hot Deals</Text>
          </View>
        }
        ListFooterComponent={
          <View>
            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
              New Arrivals
            </Text>
            <FlatList<Product>
              data={newArrivals}
              keyExtractor={(item) => `new-${item.id}`}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              renderItem={renderNewItem}
              scrollEnabled={false}
              contentContainerStyle={styles.newArrivalsContainer}
            />
          </View>
        }
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { paddingTop: 16, marginBottom: 8 },
  slogan: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 8,
  },
  newArrivalsContainer: {
    paddingBottom: 16,
  },
});
