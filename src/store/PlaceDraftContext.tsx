// Bùi Trương Nhật Quang 23521276
import React, { createContext, useContext, useMemo, useState } from "react";

import type { PickedLocation } from "../navigation/types";

type Ctx = {
  pickedLocation: PickedLocation | null;
  setPickedLocation: (loc: PickedLocation | null) => void;
  clearPickedLocation: () => void;
};

const PlaceDraftContext = createContext<Ctx | null>(null);

export const PlaceDraftProvider: React.FC<{ children: React.ReactNode }> = (
  { children }
) => {
  const [pickedLocation, setPickedLocation] = useState<PickedLocation | null>(
    null
  );

  const value = useMemo<Ctx>(
    () => ({
      pickedLocation,
      setPickedLocation,
      clearPickedLocation: () => setPickedLocation(null),
    }),
    [pickedLocation]
  );

  return (
    <PlaceDraftContext.Provider value={value}>
      {children}
    </PlaceDraftContext.Provider>
  );
};

export const usePlaceDraft = () => {
  const ctx = useContext(PlaceDraftContext);
  if (!ctx) {
    throw new Error("usePlaceDraft must be used within PlaceDraftProvider");
  }
  return ctx;
};
