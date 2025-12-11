// src/navigation/MainTabs.tsx
// Bùi Trương Nhật Quang 23521276
import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeStack from "./HomeStack";
import CategoryStack from "./CategoryStack";
import CartStack from "./CartStack";
import AccountStack from "./AccountStack";
import { useCartStore } from "../store/cartStore";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const items = useCartStore((s) => s.items);
  const totalQuantity = items.reduce(
    (sum, it) => sum + (it.quantity ?? 0),
    0
  );

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const prevCount = useRef(totalQuantity);

  useEffect(() => {
    if (totalQuantity > prevCount.current) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.25,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true,
        }),
      ]).start();
    }
    prevCount.current = totalQuantity;
  }, [totalQuantity, scaleAnim]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, 
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="CategoryTab"
        component={CategoryStack}
        options={{
          title: "Categories",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="CartTab"
        component={CartStack}
        options={{
          title: "Cart",
          tabBarBadge: totalQuantity > 0 ? totalQuantity : undefined,
          tabBarBadgeStyle: {
            backgroundColor: "red",
            color: "white",
          },
          tabBarIcon: ({ color, size }) => (
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Ionicons name="cart" color={color} size={size} />
            </Animated.View>
          ),
        }}
      />

      <Tab.Screen
        name="AccountTab"
        component={AccountStack}
        options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
