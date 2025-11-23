// 23521276 Bùi Trương Nhật Quang
import React from 'react';
import { Stack } from 'expo-router';


export default function HomeLayout() {
return (
<Stack>
<Stack.Screen name="index" options={{ title: 'IE307 Notes', headerTitleAlign: 'center' }} />
<Stack.Screen name="add" options={{ title: 'Add Note', headerTitleAlign: 'center' }} />
<Stack.Screen name="edit" options={{ title: 'Edit Note', headerTitleAlign: 'center' }} />
</Stack>
);
}