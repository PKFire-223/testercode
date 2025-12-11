// src/navigation/CategoryStack.tsx
// Bùi Trương Nhật Quang 23521276
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoriesScreen from "../screens/categories/CategoriesScreen";
import ProductDetailScreen from "../screens/home/ProductDetailScreen";

export type CategoryStackParamList = {
  Categories: undefined;
  ProductDetail: { productId: number } | { product: any };
};

const Stack = createNativeStackNavigator<CategoryStackParamList>();

export default function CategoryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{ title: "Categories" }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "Product Detail" }}
      />
    </Stack.Navigator>
  );
}
