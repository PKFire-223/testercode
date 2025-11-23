// 23521276 Bùi Trương Nhật Quang
import { Redirect, type Href } from "expo-router";
import { useAuth } from "../src/context/AuthContext";
export default function Index() {
  const { isAuthenticated } = useAuth()
  return <Redirect href={isAuthenticated ? "/(main)/home" : "/(auth)/login"} />
}
