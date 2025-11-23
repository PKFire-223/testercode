// 23521276 Bùi Trương Nhật Quang
import { Stack } from "expo-router";
import { DrawerToggleButton } from "@react-navigation/drawer";

export default function NotificationsStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Notifications",
          headerShown: true,
          headerLeft: () => <DrawerToggleButton />,
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          title: "Notification Details",
          headerShown: true,
          headerLeft: undefined, 
        }}
      />
    </Stack>
  );
}
