// Bùi Trương Nhật Quang 23521276
import React, { useCallback, useLayoutEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useIsFocused, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";

import type { PlacesStackParamList } from "../../navigation/types";
import { fetchPlaces } from "../../storage/placesDb";
import type { Place } from "../../models/Place";
import { mapRowToPlace } from "../../models/Place";

type Nav = NativeStackNavigationProp<PlacesStackParamList, "PlacesList">;

export default function PlacesListScreen() {
  const navigation = useNavigation<Nav>();
  const isFocused = useIsFocused();
  const [items, setItems] = useState<Place[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const rows = await fetchPlaces();
      setItems(rows.map(mapRowToPlace));
    } catch (e: any) {
      setError(e?.message ?? "Failed to load places");
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate("AddPlace")}
          style={({ pressed }) => [styles.headerBtn, pressed && { opacity: 0.6 }]}
        >
          <Ionicons name="add" size={24} />
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

  if (!items.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>No places added yet - start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => navigation.navigate("PlaceDetail", { placeId: item.id })}
          style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
        >
          <Image source={{ uri: item.imageUri }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.sub} numberOfLines={2}>
              {item.location.address ??
                `${item.location.latitude.toFixed(6)}, ${item.location.longitude.toFixed(6)}`}
            </Text>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 12,
    gap: 12,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: "100%",
    height: 160,
  },
  info: {
    padding: 12,
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  sub: {
    fontSize: 13,
    opacity: 0.75,
  },
  headerBtn: {
    padding: 8,
    marginRight: 4,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  empty: {
    fontSize: 14,
    opacity: 0.8,
    textAlign: "center",
  },
  error: {
    fontSize: 14,
    color: "#b00020",
    textAlign: "center",
  },
});
