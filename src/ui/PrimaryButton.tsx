// Bùi Trương Nhật Quang 23521276
import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

export default function PrimaryButton({
  title,
  onPress,
  disabled,
  style,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        disabled && styles.btnDisabled,
        pressed && !disabled && styles.btnPressed,
        style,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#1f6feb",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  btnPressed: { opacity: 0.85 },
  btnDisabled: { opacity: 0.4 },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
});