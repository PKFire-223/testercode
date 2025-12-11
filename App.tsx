// src/App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "../Lab4-1/src/navigation/RootNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
