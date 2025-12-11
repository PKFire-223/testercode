// src/screens/account/EditProfileScreen.tsx
// Bùi Trương Nhật Quang 23521276
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { useAuthStore } from "../../store/authStore";
import { updateUser, User } from "../../api/users";
import LoadingOverlay from "../../components/LoadingOverlay";

export default function EditProfileScreen() {
  const navigation = useNavigation();

  const userId = useAuthStore((s) => s.userId);
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [number, setNumber] = useState("");
  useEffect(() => {
    if (!userId || !profile) {
      setLoading(false);
      return;
    }
    setUser(profile);
    setFirstname(profile.name.firstname);
    setLastname(profile.name.lastname);
    setEmail(profile.email);
    setPhone(profile.phone);
    setStreet(profile.address.street);
    setCity(profile.address.city);
    setNumber(String(profile.address.number));
    setLoading(false);
  }, [userId, profile]);

  const onSave = async () => {
    if (!userId || !user) return;

    try {
      setLoading(true);

      const updated: User = {
        ...user,
        email,
        phone,
        name: { firstname, lastname },
        address: {
          ...user.address,
          street,
          city,
          number: Number(number),
        },
      };
      await updateUser(userId, updated);
      setProfile(updated);

      Alert.alert("Saved", "Profile updated successfully");
      navigation.goBack();
    } catch (e) {
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onSave} style={{ paddingHorizontal: 8 }}>
          <Ionicons name="checkmark" size={22} />
        </TouchableOpacity>
      ),
    });
  });

  if (loading && !user) {
    return <LoadingOverlay />;
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>Cannot load user info</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>First name</Text>
      <TextInput
        style={styles.input}
        value={firstname}
        onChangeText={setFirstname}
      />

      <Text style={styles.label}>Last name</Text>
      <TextInput
        style={styles.input}
        value={lastname}
        onChangeText={setLastname}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />

      <Text style={styles.label}>Street</Text>
      <TextInput
        style={styles.input}
        value={street}
        onChangeText={setStreet}
      />

      <Text style={styles.label}>City</Text>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
      />

      <Text style={styles.label}>Number</Text>
      <TextInput
        style={styles.input}
        value={number}
        onChangeText={setNumber}
        keyboardType="numeric"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { padding: 16 },
  label: {
    fontSize: 12,
    color: "#888",
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 4,
  },
});
