// 23521276 Bùi Trương Nhật Quang
import React from 'react';
import { Text as RNText, View as RNView, TouchableOpacity as RNTouchableOpacity, type TextProps, type ViewProps } from 'react-native';
import { useSettings } from '@/lib/SettingsContext';


function useColors() {
const { dark } = useSettings();
return {
bg: dark ? '#0b0f14' : '#ffffff',
card: dark ? '#141a21' : '#f7f7f9',
text: dark ? '#eaf2ff' : '#0a0a0a',
sub: dark ? '#b6c2d0' : '#475569',
border: dark ? '#243040' : '#e5e7eb',
primary: '#2563eb',
danger: '#ef4444'
};
}


export const View: React.FC<ViewProps> = ({ style, ...rest }) => {
const c = useColors();
return <RNView style={[{ backgroundColor: c.bg }, style]} {...rest} />;
};


export const Card: React.FC<ViewProps> = ({ style, ...rest }) => {
const c = useColors();
return <RNView style={[{ backgroundColor: c.card, borderColor: c.border, borderWidth: 1, borderRadius: 12, padding: 12 }, style]} {...rest} />;
};


export const Text: React.FC<TextProps> = ({ style, ...rest }) => {
const { fontSize } = useSettings();
const c = useColors();
return <RNText style={[{ color: c.text, fontSize }, style]} {...rest} />;
};


export const TouchableOpacity: React.FC<React.ComponentProps<typeof RNTouchableOpacity>> = ({ style, ...rest }) => {
const c = useColors();
return <RNTouchableOpacity style={[{ padding: 8, borderRadius: 10, backgroundColor: c.card, borderWidth: 1, borderColor: c.border }, style]} {...rest} />;
};


export const useThemeColors = useColors;