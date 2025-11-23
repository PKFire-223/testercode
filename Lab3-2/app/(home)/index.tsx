// 23521276 Bùi Trương Nhật Quang
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Alert } from 'react-native';
import { Link, useFocusEffect } from 'expo-router';
import { Text, View, Card, TouchableOpacity, useThemeColors } from '@/lib/Themed';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
const [notes, setNotes] = useState<Note[]>([]);
const c = useThemeColors();


const load = useCallback(async () => { setNotes(await getAllNotes()); }, []);
useFocusEffect(React.useCallback(() => { load(); }, [load]));


const onDelete = (id: number) => {
Alert.alert('Delete note', 'Are you sure?', [
{ text: 'Cancel', style: 'cancel' },
{ text: 'Delete', style: 'destructive', onPress: async () => { await deleteNote(id); await load(); } }
]);
};


const renderItem = ({ item }: { item: Note }) => (
<Card style={{ marginBottom: 10 }}>
<Link href={{ pathname: '/(home)/edit', params: { id: String(item.id), title: item.title, content: item.content ?? '' } }} asChild>
<TouchableOpacity style={{ padding: 8 }}>
<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
<View style={{ flex: 1, paddingRight: 10 }}>
<Text style={{ fontWeight: '700' }}>{item.title}</Text>
{!!item.content && <Text style={{ marginTop: 4 }} numberOfLines={2}>{item.content}</Text>}
</View>
<TouchableOpacity onPress={() => onDelete(item.id)}>
<Ionicons name="trash" size={20} color="#ef4444" />
</TouchableOpacity>
</View>
</TouchableOpacity>
</Link>
</Card>
);


return (
<View style={{ flex: 1, padding: 12 }}>
{notes.length === 0 ? (
<Card>
<Text style={{ textAlign: 'center' }}>No notes yet. Tap + to add.</Text>
</Card>
) : (
<FlatList data={notes} keyExtractor={(n) => String(n.id)} renderItem={renderItem} contentContainerStyle={{ paddingBottom: 20 }} />
)}


<Link href="/(home)/add" asChild>
<TouchableOpacity style={{ position: 'absolute', right: 16, bottom: 24, backgroundColor: c.primary }}>
<Ionicons name="add" size={26} color="#fff" />
</TouchableOpacity>
</Link>
</View>
);
}