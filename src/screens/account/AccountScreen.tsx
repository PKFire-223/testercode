// src/screens/account/AccountScreen.tsx
// Bùi Trương Nhật Quang 23521276
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { useAuthStore } from "../../store/authStore";
import { getUser } from "../../api/users";
import LoadingOverlay from "../../components/LoadingOverlay";

export default function AccountScreen() {
  const navigation = useNavigation();

  const userId = useAuthStore((s) => s.userId);
  const logout = useAuthStore((s) => s.logout);
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    const load = async () => {
      try {
        const u = await getUser(userId);
        setProfile(u);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId, setProfile]);

  if (loading) return <LoadingOverlay />;

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text>Cannot load user info</Text>
      </View>
    );
  }

  const user = profile;
  const fullName = `${user.name.firstname} ${user.name.lastname}`;
  const address = `${user.address.number} ${user.address.street}, ${user.address.city}`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: "https://i.pravatar.cc/100?img=3" }}
            style={styles.avatar}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.username}>@{user.username}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile" as never)}
        >
          <Ionicons name="create-outline" size={22} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{fullName}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Username</Text>
        <Text style={styles.value}>{user.username}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{user.phone}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{address}</Text>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>LOG OUT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatarWrapper: {
    marginRight: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  name: { fontSize: 18, fontWeight: "bold" },
  username: { color: "#666" },
  section: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: "#888",
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
  },
  logoutBtn: {
    marginTop: 32,
    backgroundColor: "#000",
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
