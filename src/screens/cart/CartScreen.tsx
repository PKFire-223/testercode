// src/screens/cart/CartScreen.tsx
// Bùi Trương Nhật Quang 23521276
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import CartItemRow from "../../components/CartItemRow";
import ConfirmModal from "../../components/ConfirmModal";
import { useCartStore } from "../../store/cartStore";
import { useNavigation } from "@react-navigation/native";

export default function CartScreen() {
  const navigation = useNavigation();
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total);
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);
  const removeItem = useCartStore((s) => s.removeItem);
  const modalProductId = useCartStore((s) => s.modalProductId);
  const setModalProductId = useCartStore((s) => s.setModalProductId);

  const hasItems = items.length > 0;

  return (
    <SafeAreaView style={styles.safe}>
      {!hasItems ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No items in your cart</Text>
          <TouchableOpacity
            style={styles.shopNowBtn}
            onPress={() => navigation.getParent()?.navigate("HomeTab" as never)}
          >
            <Text style={styles.shopNowText}>SHOP NOW</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
            data={items}
            keyExtractor={(item) => item.productId.toString()}
            renderItem={({ item }) => (
              <CartItemRow
                item={item}
                onIncrease={() => increase(item.productId)}
                onDecrease={() => decrease(item.productId)}
                onRemove={() => setModalProductId(item.productId)}
              />
            )}
          />
          <View style={styles.footer}>
            <Text style={styles.totalText}>
              Total Amount: ${total.toFixed(2)}
            </Text>
            <TouchableOpacity style={styles.checkoutBtn}>
              <Text style={styles.checkoutText}>CHECKOUT</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ConfirmModal
        visible={modalProductId != null}
        title="Remove item"
        message="Do you want to remove this item from cart?"
        onCancel={() => setModalProductId(null)}
        onConfirm={() => {
          if (modalProductId != null) {
            removeItem(modalProductId);
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1 },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  checkoutBtn: {
    backgroundColor: "#000",
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    marginBottom: 16,
  },
  shopNowBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#000",
  },
  shopNowText: {
    fontWeight: "bold",
  },
});
