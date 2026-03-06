import { create } from "zustand";
import * as eva from "@eva-design/eva";
import { buildThemeFromSeeds } from "./helper";

export interface IThemeState {
  themeMode: "light" | "dark";
}
export interface IThemeStore extends IThemeState {
  theme: typeof eva.light | typeof eva.dark;
  setThemeMode: (themeMode: "light" | "dark") => void;
  reset: () => void;
}

const initialState: IThemeState = {
  themeMode: "light",
};

// make base color by https://colors.eva.design
const baseColors = {
  primary: "#3543F6",
  success: "#4AC63F",
  info: "#429DFF",
  warning: "#FFD402",
  danger: "#FF3C2B",
};
export const useThemeStore = create<IThemeStore>((set, get) => ({
  ...initialState,
  theme: {
    ...eva[initialState.themeMode],
    ...buildThemeFromSeeds({
      ...baseColors,
    }),
  },
  setThemeMode: (themeMode: "light" | "dark") => {
    const newTheme = {
      ...eva[themeMode],
      ...buildThemeFromSeeds({
        ...baseColors,
      }),
    };
    set({
      themeMode,
      theme: newTheme,
    });
  },
  reset: () => set({ ...initialState }),
}));
