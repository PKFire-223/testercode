// Bùi Trương Nhật Quang 23521276
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const pushLocalNotification = async (title: string, body: string) => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    Alert.alert("Notifications permission not granted.");
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: null,
  });
};
