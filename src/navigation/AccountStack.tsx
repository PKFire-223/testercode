// src/navigation/AccountStack.tsx
// Bùi Trương Nhật Quang 23521276
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../screens/account/AccountScreen";
import EditProfileScreen from "../screens/account/EditProfileScreen";

export type AccountStackParamList = {
  Account: undefined;
  EditProfile: undefined;
};

const Stack = createNativeStackNavigator<AccountStackParamList>();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{ title: "Account" }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
    </Stack.Navigator>
  );
}
