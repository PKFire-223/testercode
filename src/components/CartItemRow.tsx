// src/components/CartItemRow.tsx
// Bùi Trương Nhật Quang 23521276
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CartItem } from "../store/cartStore";

interface Props {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default function CartItemRow({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.rating}>
          ⭐ {item.rate} ({item.countRating})
        </Text>
        <View style={styles.rowBottom}>
          <View style={styles.qtyRow}>
            <TouchableOpacity onPress={onDecrease} style={styles.qtyBtn}>
              <Ionicons name="remove" size={16} />
            </TouchableOpacity>
            <Text style={styles.qtyValue}>{item.quantity}</Text>
            <TouchableOpacity onPress={onIncrease} style={styles.qtyBtn}>
              <Ionicons name="add" size={16} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onRemove}>
            <Ionicons name="trash" size={20} color="#c00" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.itemTotal}>
        <Text style={styles.itemTotalText}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginVertical: 4,
    elevation: 1,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    marginRight: 8,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    marginBottom: 2,
  },
  price: {
    fontWeight: "bold",
  },
  rating: {
    fontSize: 11,
    marginBottom: 4,
  },
  rowBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyBtn: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  qtyValue: {
    marginHorizontal: 8,
  },
  itemTotal: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginLeft: 8,
  },
  itemTotalText: {
    fontWeight: "bold",
  },
});
