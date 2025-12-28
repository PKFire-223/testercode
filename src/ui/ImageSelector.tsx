// Bùi Trương Nhật Quang 23521276
import React, { useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

import PrimaryButton from "./PrimaryButton";

export default function ImageSelector({
  imageUri,
  onChange,
}: {
  imageUri: string | null;
  onChange: (uri: string | null) => void;
}) {
  const [busy, setBusy] = useState(false);

  const normalizeIosPhUri = async (uri: string, assetId?: string | null) => {
    if (Platform.OS !== "ios") return uri;
    if (!uri.startsWith("ph://")) return uri;

    const idFromUri = uri.match(/^ph:\/\/([^\/]+)/)?.[1] ?? null;
    const id = assetId ?? idFromUri;
    if (!id) return uri;

    const perm = await MediaLibrary.requestPermissionsAsync();
    if (!perm.granted) {
      Alert.alert(
        "Missing Permissions!",
        "You need to grant photo library permissions.",
        [
          { text: "Open Settings", onPress: () => Linking.openSettings() },
          { text: "OK" },
        ]
      );
      return uri;
    }

    const info = await MediaLibrary.getAssetInfoAsync(id);
    return info.localUri ?? uri;
  };

  const pickFromLibrary = async () => {
    try {
      setBusy(true);

      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        Alert.alert(
          "Missing Permissions!",
          "You need to grant photo library permissions.",
          [
            { text: "Open Settings", onPress: () => Linking.openSettings() },
            { text: "OK" },
          ]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const a = result.assets[0];
        const fixedUri = await normalizeIosPhUri(
          a.uri,
          (a as any).assetId ?? null
        );
        onChange(fixedUri);
      }
    } finally {
      setBusy(false);
    }
  };

  const takePhoto = async () => {
    try {
      setBusy(true);

      const perm = await ImagePicker.requestCameraPermissionsAsync();
      if (!perm.granted) {
        Alert.alert(
          "Missing Permissions!",
          "You need to grant camera permissions.",
          [
            { text: "Open Settings", onPress: () => Linking.openSettings() },
            { text: "OK" },
          ]
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const a = result.assets[0];
        const fixedUri = await normalizeIosPhUri(
          a.uri,
          (a as any).assetId ?? null
        );
        onChange(fixedUri);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image</Text>

      <View style={styles.preview}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={styles.placeholder}>No image picked yet.</Text>
        )}
      </View>

      <View style={styles.row}>
        <PrimaryButton
          title={busy ? "..." : "Pick Image"}
          onPress={pickFromLibrary}
          disabled={busy}
          style={styles.half}
        />
        <PrimaryButton
          title={busy ? "..." : "Take Photo"}
          onPress={takePhoto}
          disabled={busy}
          style={styles.half}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 10 },
  title: { fontSize: 14, fontWeight: "700" },
  preview: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f6f6",
  },
  image: { width: "100%", height: "100%" },
  placeholder: { opacity: 0.7 },
  row: { flexDirection: "row", gap: 10 },
  half: { flex: 1 },
});
