// Bùi Trương Nhật Quang 23521276
import React from "react";
import { Platform } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import type { RootTabParamList } from "./types";
import PlacesStackNavigator from "./PlacesStackNavigator";
import MediaStackNavigator from "./MediaStackNavigator";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: Platform.OS === "ios" ? undefined : undefined,
          tabBarIcon: ({ color, size }) => {
            const name =
              route.name === "Places"
                ? "location-outline"
                : "images-outline";
            return <Ionicons name={name} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Places" component={PlacesStackNavigator} />
        <Tab.Screen name="Media" component={MediaStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
