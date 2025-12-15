import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TextInput,
} from "react-native";

// Lấy URL backend từ .env, không hardcode trực tiếp
const ADMIN_LOGIN_URL = process.env.EXPO_PUBLIC_ADMIN_LOGIN_URL || "";

export default function App() {
  const [inputPass, setInputPass] = useState("");

  const loginSafe = async () => {
    if (!inputPass.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập mật khẩu admin.");
      return;
    }

    if (!ADMIN_LOGIN_URL) {
      Alert.alert(
        "Lỗi cấu hình",
        "Thiếu biến môi trường EXPO_PUBLIC_ADMIN_LOGIN_URL."
      );
      return;
    }

    try {
      const res = await fetch(ADMIN_LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: inputPass }),
      });

      if (!res.ok) {
        Alert.alert(
          "Admin (GIẢI PHÁP)",
          "Sai mật khẩu hoặc không được phép (backend trả lỗi)."
        );
        return;
      }

      const data = await res.json().catch(() => ({}));

      Alert.alert(
        "Admin (GIẢI PHÁP)",
        `Đăng nhập thành công (demo).\nServer trả về: ${
          data.message ?? "[token / role / thông tin khác]"
        }`
      );
    } catch (err) {

      const msg =
        err && typeof err === "object" && "message" in err
          ? err.message
          : String(err);
      Alert.alert("Lỗi mạng", String(msg));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        DEMO GIẢI PHÁP – KHÔNG HARDCODE MẬT KHẨU TRONG MÃ NGUỒN
      </Text>
      <Text style={styles.desc}>
        Mật khẩu admin không còn nằm trong bundle React Native. Ứng dụng chỉ
        gửi chuỗi bạn nhập lên server để backend kiểm tra.
      </Text>

      <Text style={styles.label}>
        Nhập mật khẩu admin (hiển thị rõ, không che):
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập mật khẩu admin..."
        autoCapitalize="none"
        value={inputPass}
        onChangeText={setInputPass}
      />

      <Button title="Đăng nhập Admin (GIẢI PHÁP)" onPress={loginSafe} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  desc: {
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
});
