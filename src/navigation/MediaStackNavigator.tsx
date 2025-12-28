// Bùi Trương Nhật Quang 23521276
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { MediaStackParamList } from "./types";
import MediaLibraryScreen from "../screens/media/MediaLibraryScreen";
import RecordVideoScreen from "../screens/media/RecordVideoScreen";

const Stack = createNativeStackNavigator<MediaStackParamList>();

export default function MediaStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MediaLibrary"
        component={MediaLibraryScreen}
        options={{ title: "My Gallery" }}
      />
      <Stack.Screen
        name="RecordVideo"
        component={RecordVideoScreen}
        options={{ title: "Record Video" }}
      />
    </Stack.Navigator>
  );
}
