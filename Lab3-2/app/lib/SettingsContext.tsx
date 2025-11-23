// 23521276 Bùi Trương Nhật Quang
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getSettings, setDarkMode, setFontSize, type Settings } from '@/lib/sqlite';


export type SettingsState = {
dark: boolean;
fontSize: number;
setDark: (v: boolean) => void;
setSize: (v: number) => void;
};


const Ctx = createContext<SettingsState | null>(null);


export const SettingsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
const [dark, setDarkState] = useState(false);
const [fontSize, setFontSizeState] = useState(16);


useEffect(() => {
(async () => {
const s: Settings = await getSettings();
setDarkState(!!s.darkMode);
setFontSizeState(s.fontSize);
})();
}, []);


const setDark = useCallback(async (v: boolean) => {
setDarkState(v);
await setDarkMode(v);
}, []);


const setSize = useCallback(async (v: number) => {
setFontSizeState(v);
await setFontSize(v);
}, []);


const value = useMemo(() => ({ dark, fontSize, setDark, setSize }), [dark, fontSize]);
return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};


export function useSettings() {
const ctx = useContext(Ctx);
if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
return ctx;
}