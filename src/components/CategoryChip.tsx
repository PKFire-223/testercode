// src/components/CategoryChip.tsx
// Bùi Trương Nhật Quang 23521276
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export default function CategoryChip({ label, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 4,
  },
  chipSelected: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  label: {
    fontSize: 12,
    color: "#333",
    textTransform: "capitalize",
  },
  labelSelected: {
    color: "#fff",
  },
});
