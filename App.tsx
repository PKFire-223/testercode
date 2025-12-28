// Bùi Trương Nhật Quang 23521276
import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import AppNavigator from "./src/navigation/AppNavigator";
import { initDb } from "./src/storage/placesDb";
import { PlaceDraftProvider } from "./src/store/PlaceDraftContext";

export default function App() {
  const [ready, setReady] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        await initDb();
        setReady(true);
      } catch (e: any) {
        setInitError(e?.message ?? "DB init failed");
      }
    })();
  }, []);

  if (initError) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Initialization error</Text>
        <Text style={styles.msg}>{initError}</Text>
      </View>
    );
  }

  if (!ready) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <PlaceDraftProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </PlaceDraftProvider>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  msg: {
    fontSize: 14,
    opacity: 0.9,
    textAlign: "center",
  },
});
