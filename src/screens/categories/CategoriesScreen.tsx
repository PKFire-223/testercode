// src/screens/categories/CategoriesScreen.tsx
// Bùi Trương Nhật Quang 23521276
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CategoryChip from "../../components/CategoryChip";
import ProductCard from "../../components/ProductCard";
import LoadingOverlay from "../../components/LoadingOverlay";
import {
  getCategories,
  getProductsByCategory,
  Product,
} from "../../api/products";
import { useCartStore } from "../../store/cartStore";

export default function CategoriesScreen() {
  const navigation = useNavigation<any>();
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const load = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats);
        const data = await getProductsByCategory("all");
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const onSelectCategory = async (cat: string) => {
    setSelected(cat);
    setLoading(true);
    try {
      const data = await getProductsByCategory(cat);
      setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (p: Product) => {
    const ok = addItem(p);
    if (!ok) {
      Alert.alert("Already in cart", "This product is already added.");
    }
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
      onAdd={() => handleAdd(item)}
    />
  );

  if (loading && products.length === 0) {
    return <LoadingOverlay />;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.chipsRow}>
        <FlatList<string>
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <CategoryChip
              label={item}
              selected={item === selected}
              onPress={() => onSelectCategory(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {loading && <LoadingOverlay />}

      <FlatList<Product>
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8 }}
        data={products}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  chipsRow: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
