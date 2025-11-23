// 23521276 Bùi Trương Nhật Quang
import React, { useMemo, useState } from 'react';
import { Alert, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, useThemeColors, Card } from '@/lib/Themed';
import { Ionicons } from '@expo/vector-icons';


export default function EditNoteScreen() {
const params = useLocalSearchParams<{ id: string; title: string; content?: string }>();
const id = useMemo(() => Number(params.id), [params.id]);
const [title, setTitle] = useState(params.title || '');
const [content, setContent] = useState(params.content || '');
const router = useRouter();
const c = useThemeColors();


const onSave = async () => {
if (!title.trim()) { Alert.alert('Missing title', 'Please enter a title.'); return; }
await updateNote(id, title.trim(), content.trim() || null);
router.back();
};


return (
<View style={{ flex: 1, padding: 12 }}>
<Card style={{ marginBottom: 10 }}>
<Text style={{ marginBottom: 6 }}>Title</Text>
<TextInput value={title} onChangeText={setTitle} placeholderTextColor={c.sub} style={{ color: c.text, fontSize: 18, paddingVertical: 10 }} />
</Card>


<Card>
<Text style={{ marginBottom: 6 }}>Content</Text>
<TextInput value={content} onChangeText={setContent} placeholderTextColor={c.sub} style={{ color: c.text, minHeight: 160, textAlignVertical: 'top' }} multiline />
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