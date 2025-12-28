// Bùi Trương Nhật Quang 23521276
import React, { useCallback, useLayoutEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useIsFocused, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { MediaStackParamList } from "../../navigation/types";
import VideoTile from "../../ui/VideoTile";

type Nav = NativeStackNavigationProp<MediaStackParamList, "MediaLibrary">;

type ResolvedAsset = MediaLibrary.Asset & { displayUri: string };

export default function MediaLibraryScreen() {
  const navigation = useNavigation<Nav>();
  const isFocused = useIsFocused();
  const [assets, setAssets] = useState<ResolvedAsset[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [permission, requestPermission] = MediaLibrary.usePermissions();

  const load = useCallback(async () => {
    try {
      setError(null);

      if (permission?.status !== "granted") {
        const res = await requestPermission();
        if (res.status !== "granted") {
          setError("Media library permission not granted");
          return;
        }
      }

      const fetched = await MediaLibrary.getAssetsAsync({
        mediaType: ["photo", "video"],
        sortBy: MediaLibrary.SortBy.modificationTime,
        first: 80,
      });

      const resolved: ResolvedAsset[] = await Promise.all(
        fetched.assets.map(async (a) => {
          try {
            const info = await MediaLibrary.getAssetInfoAsync(a.id);
            const displayUri =
              (info as any)?.localUri ?? (info as any)?.uri ?? a.uri;
            return { ...a, displayUri: typeof displayUri === "string" ? displayUri : a.uri };
          } catch {
            return { ...a, displayUri: a.uri };
          }
        })
      );

      setAssets(resolved);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load media");
    }
  }, [permission?.status, requestPermission]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate("RecordVideo")}
          style={({ pressed }) => [styles.headerBtn, pressed && { opacity: 0.6 }]}
        >
          <Ionicons name="videocam-outline" size={22} />
        </Pressable>
      ),
    });
  }, [navigation]);

  React.useEffect(() => {
    if (isFocused) load();
  }, [isFocused, load]);

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={assets}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.col}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const uri = item.displayUri;

          if (typeof uri === "string" && uri.startsWith("ph://")) {
            return (
              <View style={styles.tile}>
                <View style={styles.fallback}>
                  <Text style={styles.fallbackText}>Unsupported asset</Text>
                </View>
              </View>
            );
          }

          return (
            <View style={styles.tile}>
              {item.mediaType === "photo" ? (
                <Image source={{ uri }} style={styles.media} />
              ) : (
                <VideoTile uri={uri} />
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 10 },
  col: { gap: 10 },
  tile: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f2f2f2",
  },
  media: { width: "100%", height: "100%" },
  headerBtn: { padding: 8, marginRight: 4 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
  error: { fontSize: 14, color: "#b00020", textAlign: "center" },
  fallback: { flex: 1, alignItems: "center", justifyContent: "center" },
  fallbackText: { fontSize: 12, color: "#666" },
});
