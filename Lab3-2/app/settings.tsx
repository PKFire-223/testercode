// 23521276 Bùi Trương Nhật Quang
import React from 'react';
import { View, Text, Card } from '@/lib/Themed';
import { Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import { useSettings } from '@/lib/SettingsContext';


export default function SettingsScreen() {
const { dark, fontSize, setDark, setSize } = useSettings();


return (
<View style={{ flex: 1, padding: 12 }}>
<Card style={{ marginBottom: 12 }}>
<Text style={{ fontWeight: '700', marginBottom: 8 }}>Dark mode</Text>
<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
<Text>Enable dark theme</Text>
<Switch value={dark} onValueChange={setDark} />
</View>
</Card>


<Card>
<Text style={{ fontWeight: '700', marginBottom: 8 }}>Font size</Text>
<Text style={{ color: '#64748b', marginBottom: 6 }}>Current: {fontSize}</Text>
<Slider minimumValue={12} maximumValue={36} step={2} value={fontSize} onValueChange={setSize} />
<Text style={{ marginTop: 8 }}>Preview: The quick brown fox jumps over the lazy dog.</Text>
</Card>
</View>
);
}