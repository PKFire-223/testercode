// 23521276 Bùi Trương Nhật Quang
import React, { createContext, useContext, useMemo, useState } from "react";
import { Alert } from "react-native";

const STUDENT_EMAIL = "23521276@gm.uit.edu.vn";     
const STUDENT_PASSWORD = "buitruongnhatquang";  

type Ctx = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};
const AuthContext = createContext<Ctx>({ isAuthenticated: false, login: () => {}, logout: () => {} });

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [isAuthenticated,setAuth] = useState(false)

    const login = (email: string, password: string) =>{
        const okDomain = /@gm\.uit\.edu\.vn$/i.test(email);
        if (okDomain && email === STUDENT_EMAIL && password === STUDENT_PASSWORD)
        {
            setAuth(true)
        }
        else {
            Alert.alert("Đăng nhập thất bại", "Email hoặc mật khẩu không chính xác.")
        }
    }
    const logout = () => setAuth(false)

    const value = useMemo(() => ({
        isAuthenticated,
        login,
        logout,
    }),
    [isAuthenticated]
)
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}
export const useAuth = () => useContext(AuthContext)
