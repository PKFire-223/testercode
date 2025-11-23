// 23521276 Bùi Trương Nhật Quang
import { Stack } from "expo-router";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Platform } from "react-native";

export default function HomeStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="tabs"
        options={{
          title: "Home",
          headerShown: true,
          headerLeft: () =>
            <DrawerToggleButton />,
        }}
      />
      <Stack.Screen
        name="home-details"
        options={{
          title: "Home Details",
          headerShown: true,
          headerLeft: undefined, 
        }}
      />
    </Stack>
  );
}
