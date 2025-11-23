// 23521276 Bùi Trương Nhật Quang
import React, { useState } from 'react';
import { Alert, TextInput } from 'react-native';
import { View, Text, TouchableOpacity, useThemeColors, Card } from '@/lib/Themed';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AddNoteScreen() {
const [title, setTitle] = useState('');
const [content, setContent] = useState('');
const router = useRouter();
const c = useThemeColors();


const onSave = async () => {
if (!title.trim()) { Alert.alert('Missing title', 'Please enter a title.'); return; }
insertNote(title.trim(), content.trim() || null);
router.back();
};


return (
<View style={{ flex: 1, padding: 12 }}>
<Card style={{ marginBottom: 10 }}>
<Text style={{ marginBottom: 6 }}>Title</Text>
<TextInput value={title} onChangeText={setTitle} placeholder="Note title" placeholderTextColor={c.sub} style={{ color: c.text, fontSize: 18, paddingVertical: 10 }} />
</Card>


<Card>
<Text style={{ marginBottom: 6 }}>Content</Text>
<TextInput value={content} onChangeText={setContent} placeholder="Note content (optional)" placeholderTextColor={c.sub} style={{ color: c.text, minHeight: 160, textAlignVertical: 'top' }} multiline />
</Card>


<View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
<TouchableOpacity onPress={onSave} style={{ flex: 1, backgroundColor: c.primary, alignItems: 'center' }}>
<Ionicons name="save" size={22} color="#fff" />
</TouchableOpacity>
<TouchableOpacity onPress={() => router.back()} style={{ flex: 1, alignItems: 'center' }}>
<Ionicons name="close" size={22} />
</TouchableOpacity>
</View>
</View>
);
}