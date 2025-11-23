// 23521276 Bùi Trương Nhật Quang
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "@/src/context/AuthContext";  
import { s } from "@/src/styles/account.style";       

export default function Account() {
  const { logout } = useAuth();
  return (
    <View style={s.wrap}>
      <Text style={s.title}>Account</Text>
      <TouchableOpacity style={s.btn} onPress={logout}>
        <Text style={s.btnText}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
}
