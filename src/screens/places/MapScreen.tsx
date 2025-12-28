// Bùi Trương Nhật Quang 23521276
import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import * as Location from "expo-location";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { PlacesStackParamList, PickedLocation } from "../../navigation/types";
import { usePlaceDraft } from "../../store/PlaceDraftContext";

type R = RouteProp<PlacesStackParamList, "Map">;
type N = NativeStackNavigationProp<PlacesStackParamList, "Map">;

const DEFAULT_REGION: Region = {
  latitude: 10.8708,
  longitude: 106.8021,
  latitudeDelta: 0.03,
  longitudeDelta: 0.03,
};

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

export default function MapScreen() {
  const navigation = useNavigation<N>();
  const route = useRoute<R>();
  const { setPickedLocation } = usePlaceDraft();

  const isPickMode = route.params.mode === "pick";

  const mapRef = useRef<MapView>(null);
  const [hasPerm, setHasPerm] = useState(false);
  const [selected, setSelected] = useState<PickedLocation | null>(
    route.params.initialLocation ?? null
  );

  const region = useMemo<Region>(() => {
    if (route.params.initialLocation) {
      return {
        latitude: route.params.initialLocation.latitude,
        longitude: route.params.initialLocation.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
    }
    return DEFAULT_REGION;
  }, [route.params.initialLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isPickMode ? "Pick a location" : "Map",
      headerRight: () => {
        if (!isPickMode) return null;
        return (
          <Pressable
            onPress={() => {
              if (!selected) {
                Alert.alert("No location", "Tap on the map to pick a location.");
                return;
              }
              setPickedLocation(selected);
              navigation.goBack();
            }}
            style={({ pressed }) => [styles.headerBtn, pressed && { opacity: 0.6 }]}
          >
            <Ionicons name="save-outline" size={22} />
          </Pressable>
        );
      },
    });
  }, [navigation, isPickMode, selected, setPickedLocation]);

  React.useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasPerm(status === "granted");
    })();
  }, []);

  const handleMapPress = useCallback(
    async (e: any) => {
      if (!isPickMode) return;
      const { latitude, longitude } = e.nativeEvent.coordinate;
      const base: PickedLocation = { latitude, longitude };

      let address: string | undefined;
      try {
        const rev = await Location.reverseGeocodeAsync({ latitude, longitude });
        address = formatAddress(base, rev?.[0] ?? null);
      } catch {
        address = formatAddress(base, null);
      }

      setSelected({ ...base, address });
    },
    [isPickMode]
  );

  const recenter = useCallback(async () => {
    if (!mapRef.current) return;

    try {
      let target: PickedLocation | null = selected;
      if (!target) {
        if (!hasPerm) return;
        const current = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        target = {
          latitude: current.coords.latitude,
          longitude: current.coords.longitude,
        };
      }
      mapRef.current.animateToRegion(
        {
          latitude: target.latitude,
          longitude: target.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        400
      );
    } catch {
      // ignore
    }
  }, [selected, hasPerm]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={region}
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        onPress={handleMapPress}
        showsUserLocation={hasPerm}
        showsMyLocationButton={Platform.OS === "android"}
      >
        {selected && (
          <Marker
            coordinate={{ latitude: selected.latitude, longitude: selected.longitude }}
            draggable={isPickMode}
            onDragEnd={(e) =>
              handleMapPress({ nativeEvent: { coordinate: e.nativeEvent.coordinate } })
            }
          >
            <Callout>
              <View style={{ maxWidth: 220 }}>
                <Text style={{ fontWeight: "700", marginBottom: 4 }}>
                  {route.params.title ?? "Selected location"}
                </Text>
                <Text>
                  {selected.address ??
                    `${selected.latitude.toFixed(6)}, ${selected.longitude.toFixed(6)}`}
                </Text>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>

      <Pressable
        onPress={recenter}
        style={({ pressed }) => [styles.fab, pressed && { opacity: 0.7 }]}
      >
        <Ionicons name="locate-outline" size={22} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerBtn: { padding: 8, marginRight: 4 },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 24,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});
