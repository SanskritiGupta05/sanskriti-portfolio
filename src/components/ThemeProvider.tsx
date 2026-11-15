"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { setNightSound } from "../../assets/scene/scene-audio.js";

// Day (light) is the default. The lantern switches the whole site to night (dark).
type Theme = { night: boolean; setNight: (on: boolean) => void };
const ThemeContext = createContext<Theme>({ night: false, setNight: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [night, setNightState] = useState(false);
  const setNight = useCallback((on: boolean) => setNightState(on), []);
  useEffect(() => {
    document.documentElement.dataset.theme = night ? "dark" : "light";
    setNightSound(night);
  }, [night]);
  return <ThemeContext.Provider value={{ night, setNight }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
