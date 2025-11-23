// 23521276 Bùi Trương Nhật Quang
import { View, Text, TouchableOpacity } from "react-native";
import { simpleS as s } from "../../../../src/styles/simple.style";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();
  return (
    <View style={s.page}>
      <Text style={s.title}>Home</Text>
      <TouchableOpacity
        style={{ marginTop: 16, padding: 12, borderRadius: 10, backgroundColor: "#2563EB" }}
        onPress={() => router.push("/(drawer)/(home)/home-details")}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>Go to Details</Text>
      </TouchableOpacity>
    </View>
  );
}
