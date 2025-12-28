// Bùi Trương Nhật Quang 23521276
import type { PickedLocation } from "../navigation/types";

export type PlaceRow = {
  id: number;
  title: string;
  imageUri: string;
  lat: number;
  lng: number;
  address: string | null;
};

export type Place = {
  id: number;
  title: string;
  imageUri: string;
  location: PickedLocation;
};

export const mapRowToPlace = (r: PlaceRow): Place => ({
  id: r.id,
  title: r.title,
  imageUri: r.imageUri,
  location: {
    latitude: r.lat,
    longitude: r.lng,
    address: r.address ?? undefined,
  },
});
