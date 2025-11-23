// 23521276 Bùi Trương Nhật Quang
import { Stack, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../src/context/AuthContext";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

function MainLayout() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      setIsReady(true);
    };
    init();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    if (isAuthenticated) {
      router.replace("/(drawer)/(home)/tabs/home");
    } else {
      router.replace("/(auth)/login");
    }

    SplashScreen.hideAsync();
  }, [isReady, isAuthenticated]);

  if (!isReady) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(drawer)" />
    </Stack>
  );
}
