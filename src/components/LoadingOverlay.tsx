// src/components/LoadingOverlay.tsx
// Bùi Trương Nhật Quang 23521276
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
  },
});
