// Bùi Trương Nhật Quang 23521276
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import type { PickedLocation } from "../navigation/types";
import PrimaryButton from "./PrimaryButton";

export default function LocationSelector({
  location,
  onLocateUser,
  onPickOnMap,
}: {
  location: PickedLocation | null;
  onLocateUser: () => void | Promise<void>;
  onPickOnMap: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location</Text>

      <View style={styles.preview}>
        {location ? (
          <MapView
            style={StyleSheet.absoluteFillObject}
            provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            pointerEvents="none"
          >
            <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
          </MapView>
        ) : (
          <Text style={styles.placeholder}>No location picked yet.</Text>
        )}
      </View>

      <View style={styles.row}>
        <PrimaryButton title="Locate User" onPress={onLocateUser as any} style={styles.half} />
        <PrimaryButton title="Pick on Map" onPress={onPickOnMap} style={styles.half} />
      </View>

      {location?.address ? (
        <Text style={styles.address} numberOfLines={2}>
          {location.address}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 10 },
  title: { fontSize: 14, fontWeight: "700" },
  preview: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f6f6f6",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: { opacity: 0.7 },
  row: { flexDirection: "row", gap: 10 },
  half: { flex: 1 },
  address: { fontSize: 12, opacity: 0.8 },
});
