import { createContext, useContext } from "react";
import type { HeaderTheme } from "../hooks/useHeaderTheme";

const HeaderThemeContext = createContext<HeaderTheme>("light");

export const HeaderThemeProvider = HeaderThemeContext.Provider;

export function useHeaderThemeContext(): HeaderTheme {
  return useContext(HeaderThemeContext);
}
