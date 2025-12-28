// Bùi Trương Nhật Quang 23521276
import React, { useMemo, useRef, useState } from "react";
import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";

import {
  CameraType,
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ResizeMode, Video } from "expo-av";

import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { MediaStackParamList } from "../../navigation/types";
import { pushLocalNotification } from "../../utils/notifications";


type Nav = NativeStackNavigationProp<MediaStackParamList, "RecordVideo">;

export default function RecordVideoScreen() {
  const navigation = useNavigation<Nav>();

  const [cameraPerm, requestCameraPerm] = useCameraPermissions();
  const [micPerm, requestMicPerm] = useMicrophonePermissions();
  const [mediaPerm, requestMediaPerm] = MediaLibrary.usePermissions();

  const cameraRef = useRef<CameraView>(null);

  const [facing, setFacing] = useState<CameraType>("back");
  const [recording, setRecording] = useState(false);
  const [videoUri, setVideoUri] = useState<string | null>(null);

  const canUseCamera = useMemo(
    () => cameraPerm?.granted === true && micPerm?.granted === true,
    [cameraPerm?.granted, micPerm?.granted]
  );

  const ensurePerms = async () => {
    if (!cameraPerm?.granted) {
      const res = await requestCameraPerm();
      if (!res.granted) return false;
    }
    if (!micPerm?.granted) {
      const res = await requestMicPerm();
      if (!res.granted) return false;
    }
    return true;
  };

  const toggleFacing = () => {
    setFacing((p) => (p === "back" ? "front" : "back"));
  };

  const record = async () => {
    if (recording) {
      cameraRef.current?.stopRecording();
      return;
    }

    const ok = await ensurePerms();
    if (!ok) {
      Alert.alert("Missing Permissions!", "Camera and microphone permissions are required.");
      return;
    }

    try {
      setRecording(true);
      const res = await cameraRef.current?.recordAsync();
      setVideoUri(res?.uri ?? null);
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Failed to record video");
    } finally {
      setRecording(false);
    }
  };

  const save = async () => {
    if (!videoUri) return;
    try {
      if (mediaPerm?.status !== "granted") {
        const res = await requestMediaPerm();
        if (res.status !== "granted") {
          Alert.alert("Missing Permissions!", "Media library permission is required to save the video.");
          return;
        }
      }
      await MediaLibrary.saveToLibraryAsync(videoUri);
      await pushLocalNotification("Media", "Video saved successfully!");
      navigation.goBack();
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Failed to save video");
    }
  };

  if (!cameraPerm) return null;

  if (!cameraPerm.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.msg}>We need your permission to use the camera.</Text>
        <Button title="Grant camera permission" onPress={requestCameraPerm} />
      </View>
    );
  }

  if (!micPerm?.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.msg}>We need your permission to use the microphone.</Text>
        <Button title="Grant microphone permission" onPress={requestMicPerm} />
      </View>
    );
  }

  if (videoUri) {
    return (
      <View style={styles.previewContainer}>
        <Video
          style={styles.previewVideo}
          source={{ uri: videoUri }}
          useNativeControls
          shouldPlay
          isLooping
          resizeMode={ResizeMode.CONTAIN}
        />
        <View style={styles.previewActions}>
          <Pressable onPress={() => setVideoUri(null)} style={styles.actionBtn}>
            <Text style={styles.actionText}>Re-record</Text>
          </Pressable>
          <Pressable onPress={save} style={[styles.actionBtn, styles.actionPrimary]}>
            <Text style={[styles.actionText, styles.actionPrimaryText]}>Save</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
        mode="video"
        facing={facing}
        mute={false}
        responsiveOrientationWhenOrientationLocked
      />

      <View style={styles.controls}>
        <Pressable onPress={toggleFacing} style={styles.iconBtn}>
          <Ionicons name="camera-reverse-outline" size={28} color="white" />
        </Pressable>

        <Pressable onPress={record} style={styles.shutter}>
          <View
            style={[
              styles.shutterInner,
              { backgroundColor: recording ? "#ff3b30" : "white" },
            ]}
          />
        </Pressable>

        <View style={styles.iconPlaceholder} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  controls: {
    position: "absolute",
    bottom: 36,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 28,
  },
  iconBtn: { padding: 8 },
  iconPlaceholder: { width: 44, height: 44 },
  shutter: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 5,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  shutterInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
  msg: { textAlign: "center", marginBottom: 12 },
  previewContainer: { flex: 1, backgroundColor: "black" },
  previewVideo: { flex: 1 },
  previewActions: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#1f1f1f",
    alignItems: "center",
  },
  actionText: { color: "white", fontWeight: "700" },
  actionPrimary: { backgroundColor: "#1f6feb" },
  actionPrimaryText: { color: "white" },
});