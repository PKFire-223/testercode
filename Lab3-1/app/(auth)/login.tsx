// 23521276 Bùi Trương Nhật Quang
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../src/context/AuthContext";
import { loginS as s } from "../../src/styles/login.style";

export default function LoginScreen() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    return (
        <View style={s.wrap}>
            <View style={s.header}>
                <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={s.logo} />
                <Text style={s.title}>Welcome</Text>
            </View>

            <View style={s.inputWrap}>
                <Ionicons name="mail-outline" size={20} color="gray" style={s.inputIcon} />
                <TextInput
                    style={s.input}
                    placeholder="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={s.inputWrap}>
                 <Ionicons name="lock-closed-outline" size={20} color="gray" style={s.inputIcon} />
                <TextInput
                    style={s.input}
                    placeholder="Mật Khẩu"
                    secureTextEntry
                    value={pwd}
                    onChangeText={setPwd}
                />
            </View>

            <TouchableOpacity style={s.btn} onPress={() => login(email, pwd)}>
                <Text style={s.btnText}>LOG IN</Text>
            </TouchableOpacity>

            <Text style={s.note}>
                Chưa có tài khoản? <Link href="../register" style={s.link}>Đăng ký ngay!</Link>
            </Text>
        </View>
    );
}