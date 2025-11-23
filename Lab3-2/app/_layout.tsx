// 23521276 Bùi Trương Nhật Quang
import React, { useEffect, useMemo } from 'react';
import { Tabs } from 'expo-router';
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { SettingsProvider, useSettings } from '@/lib/SettingsContext';
import { useThemeColors } from '@/lib/Themed';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';


function TabsShell() {
const { dark } = useSettings();
const c = useThemeColors();


const theme: Theme = useMemo(() => ({
...(dark ? DarkTheme : DefaultTheme),
colors: { ...(dark ? DarkTheme.colors : DefaultTheme.colors), primary: c.primary }
}), [dark]);


useEffect(() => { initDb(); }, []);


return (
<ThemeProvider value={theme}>
<StatusBar style={dark ? 'light' : 'dark'} />
<Tabs screenOptions={{
headerStyle: { backgroundColor: c.card },
headerTitleStyle: { color: c.text },
tabBarStyle: { backgroundColor: c.card, borderTopColor: c.border },
tabBarActiveTintColor: c.primary,
tabBarInactiveTintColor: c.sub
}}>
<Tabs.Screen
name="(home)"
options={{
title: 'Home',
headerShown: false,
tabBarIcon: ({ color, size }) => (<Ionicons name="home" color={color} size={size} />)
}}
/>
<Tabs.Screen
name="settings"
options={{
title: 'Settings',
tabBarIcon: ({ color, size }) => (<Ionicons name="settings" color={color} size={size} />)
}}
/>
</Tabs>
</ThemeProvider>
);
}


export default function RootLayout() {
return (
<SettingsProvider>
<TabsShell />
</SettingsProvider>
);
}