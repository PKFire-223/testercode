// Bùi Trương Nhật Quang 23521276
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { PlacesStackParamList } from "../../navigation/types";
import type { Place } from "../../models/Place";
import { fetchPlaceById } from "../../storage/placesDb";
import { mapRowToPlace } from "../../models/Place";
import PrimaryButton from "../../ui/PrimaryButton";

type R = RouteProp<PlacesStackParamList, "PlaceDetail">;
type N = NativeStackNavigationProp<PlacesStackParamList, "PlaceDetail">;

export default function PlaceDetailScreen() {
  const navigation = useNavigation<N>();
  const route = useRoute<R>();
  const [place, setPlace] = useState<Place | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setError(null);
        const row = await fetchPlaceById(route.params.placeId);
        if (!row) {
          setError("Place not found");
          return;
        }
        setPlace(mapRowToPlace(row));
      } catch (e: any) {
        setError(e?.message ?? "Failed to load place");
      }
    })();
  }, [route.params.placeId]);

  useLayoutEffect(() => {
    if (!place) return;
    navigation.setOptions({ title: place.title });
  }, [navigation, place]);

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!place) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Image source={{ uri: place.imageUri }} style={styles.image} />
      <Text style={styles.title}>{place.title}</Text>
      <Text style={styles.sub}>
        {place.location.address ??
          `${place.location.latitude.toFixed(6)}, ${place.location.longitude.toFixed(6)}`}
      </Text>

      <PrimaryButton
        title="View on Map"
        onPress={() =>
          navigation.navigate("Map", {
            mode: "view",
            initialLocation: place.location,
            title: place.title,
          })
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 12,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
  },
  sub: {
    fontSize: 13,
    opacity: 0.75,
  },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
  error: { fontSize: 14, color: "#b00020", textAlign: "center" },
});
