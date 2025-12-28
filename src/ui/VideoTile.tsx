// Bùi Trương Nhật Quang 23521276
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { ResizeMode, Video } from "expo-av";

export default function VideoTile({ uri }: { uri: string }) {
  if (Platform.OS === "ios" && uri.startsWith("ph://")) {
    return (
      <View style={[styles.container, styles.fallback]}>
        <Text style={styles.fallbackText}>Unsupported video</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Video
        style={styles.video}
        source={{ uri }}
        resizeMode={ResizeMode.COVER}
        isMuted
        shouldPlay={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  video: { width: "100%", height: "100%" },
  fallback: { alignItems: "center", justifyContent: "center" },
  fallbackText: { fontSize: 12, color: "#666" },
});
