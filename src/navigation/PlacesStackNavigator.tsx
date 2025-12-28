// Bùi Trương Nhật Quang 23521276
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { PlacesStackParamList } from "./types";
import PlacesListScreen from "../screens/places/PlacesListScreen";
import AddPlaceScreen from "../screens/places/AddPlaceScreen";
import PlaceDetailScreen from "../screens/places/PlaceDetailScreen";
import MapScreen from "../screens/places/MapScreen";

const Stack = createNativeStackNavigator<PlacesStackParamList>();

export default function PlacesStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PlacesList"
        component={PlacesListScreen}
        options={{ title: "My Places" }}
      />
      <Stack.Screen
        name="AddPlace"
        component={AddPlaceScreen}
        options={{ title: "Add a new Place" }}
      />
      <Stack.Screen
        name="PlaceDetail"
        component={PlaceDetailScreen}
        options={{ title: "Place Details" }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{ title: "Map" }}
      />
    </Stack.Navigator>
  );
}
