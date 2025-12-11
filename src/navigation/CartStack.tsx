// src/navigation/CartStack.tsx
// Bùi Trương Nhật Quang 23521276
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../screens/cart/CartScreen";

export type CartStackParamList = {
  Cart: undefined;
};

const Stack = createNativeStackNavigator<CartStackParamList>();

export default function CartStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "Cart" }}
      />
    </Stack.Navigator>
  );
}
