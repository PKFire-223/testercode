// Bùi Trương Nhật Quang 23521276
export type PickedLocation = {
  latitude: number;
  longitude: number;
  address?: string;
};

export type PlacesStackParamList = {
  PlacesList: undefined;
  AddPlace: undefined;
  PlaceDetail: { placeId: number };
  Map: {
    mode: "pick" | "view";
    initialLocation?: PickedLocation;
    title?: string;
  };
};

export type MediaStackParamList = {
  MediaLibrary: undefined;
  RecordVideo: undefined;
};

export type RootTabParamList = {
  Places: undefined;
  Media: undefined;
};
