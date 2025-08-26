import { create } from "zustand";

interface ThemeState {
	theme: string;
	setTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
	theme: localStorage.getItem("note-theme") || "sunset",
	setTheme: (theme: string) => {
		localStorage.setItem("note-theme", theme);
		set({ theme });
	},
}));
