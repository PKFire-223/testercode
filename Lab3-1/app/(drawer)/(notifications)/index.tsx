// 23521276 Bùi Trương Nhật Quang
import { View, Text, TouchableOpacity } from "react-native";
import { simpleS as s } from "../../../src/styles/simple.style";
import { useRouter } from "expo-router";

export default function Notifications() {
  const router = useRouter();
  return (
    <View style={s.page}>
      <Text style={s.title}>Notifications</Text>
      <TouchableOpacity
        style={{ marginTop: 16, padding: 12, borderRadius: 10, backgroundColor: "#2563EB" }}
        onPress={() => router.push("/(drawer)/(notifications)/details")}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>Go to Details</Text>
      </TouchableOpacity>
    </View>
  );
}
