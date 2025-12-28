// Bùi Trương Nhật Quang 23521276
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useIsFocused, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Location from "expo-location";

import type { PlacesStackParamList, PickedLocation } from "../../navigation/types";
import ImageSelector from "../../ui/ImageSelector";
import LocationSelector from "../../ui/LocationSelector";
import PrimaryButton from "../../ui/PrimaryButton";
import { usePlaceDraft } from "../../store/PlaceDraftContext";
import { insertPlace } from "../../storage/placesDb";
import { pushLocalNotification } from "../../utils/notifications";

type Nav = NativeStackNavigationProp<PlacesStackParamList, "AddPlace">;

const formatAddress = (
  loc: PickedLocation,
  rev?: Location.LocationGeocodedAddress | null
) => {
  const anyRev = rev as any;
  if (anyRev?.formattedAddress && typeof anyRev.formattedAddress === "string") {
    return anyRev.formattedAddress as string;
  }

  const parts = [
    rev?.name,
    rev?.street,
    rev?.district,
    rev?.city,
    rev?.region,
    rev?.postalCode,
    rev?.country,
  ].filter(Boolean);
  if (parts.length) return parts.join(", ");

  return `${loc.latitude.toFixed(6)}, ${loc.longitude.toFixed(6)}`;
};

export default function AddPlaceScreen() {
  const navigation = useNavigation<Nav>();
  const isFocused = useIsFocused();
  const { pickedLocation, clearPickedLocation } = usePlaceDraft();

  const [title, setTitle] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [location, setLocation] = useState<PickedLocation | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isFocused && pickedLocation) {
      setLocation(pickedLocation);
      clearPickedLocation();
    }
  }, [isFocused, pickedLocation, clearPickedLocation]);

  const hasAllFields = useMemo(
    () => title.trim().length > 0 && !!imageUri && !!location,
    [title, imageUri, location]
  );

  const locateUser = async () => {
    try {
      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (!servicesEnabled) {
        Alert.alert(
          "Location Services Off",
          "Please enable Location Services to get your current position.",
          [
            { text: "Open Settings", onPress: () => Linking.openSettings() },
            { text: "OK" },
          ]
        );
        return;
      }

      let perm = await Location.getForegroundPermissionsAsync();
      if (!perm.granted) {
        perm = await Location.requestForegroundPermissionsAsync();
      }

      if (!perm.granted) {
        Alert.alert(
          "Missing Permissions!",
          "You need to grant permissions to access the location.",
          [
            { text: "Open Settings", onPress: () => Linking.openSettings() },
            { text: "OK" },
          ]
        );
        return;
      }

      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const base: PickedLocation = {
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      };

      let address: string | undefined;
      try {
        const rev = await Location.reverseGeocodeAsync({
          latitude: base.latitude,
          longitude: base.longitude,
        });
        address = formatAddress(base, rev?.[0] ?? null);
      } catch {
        address = formatAddress(base, null);
      }

      setLocation({ ...base, address });
    } catch (e: any) {
      Alert.alert(
        "Location Error",
        e?.message ?? "Failed to get current location.",
        [
          { text: "Open Settings", onPress: () => Linking.openSettings() },
          { text: "OK" },
        ]
      );
    }
  };

  const pickOnMap = () => {
    navigation.navigate("Map", {
      mode: "pick",
      initialLocation: location ?? undefined,
    });
  };

  const addPlace = async () => {
    if (!title.trim()) {
      Alert.alert("Missing title", "Please enter a title.");
      return;
    }
    if (!imageUri) {
      Alert.alert("Missing image", "Please pick or take an image.");
      return;
    }
    if (!location) {
      Alert.alert("Missing location", "Please locate or pick a location.");
      return;
    }

    try {
      setSaving(true);
      await insertPlace(
        title.trim(),
        imageUri,
        location.latitude,
        location.longitude,
        location.address ?? null
      );
      await pushLocalNotification("Places", "Place added successfully!");
      navigation.goBack();
      setTitle("");
      setImageUri(null);
      setLocation(null);
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Failed to add place");
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Enter place name"
          style={styles.input}
          autoCapitalize="sentences"
        />

        <View style={styles.block}>
          <ImageSelector imageUri={imageUri} onChange={setImageUri} />
        </View>

        <View style={styles.block}>
          <LocationSelector
            location={location}
            onLocateUser={locateUser}
            onPickOnMap={pickOnMap}
          />
        </View>

        <PrimaryButton
          title={saving ? "Adding..." : "Add Place"}
          disabled={!hasAllFields || saving}
          onPress={addPlace}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 12 },
  label: { fontSize: 14, fontWeight: "700" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 12 : 10,
    fontSize: 14,
  },
  block: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
});
