import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
	theme: Theme;
	setTheme: (t: Theme) => void;
}>({ theme: "dark", setTheme: () => {} });

export function ThemeProvider({
	children,
	defaultTheme = "dark",
}: {
	children: React.ReactNode;
	defaultTheme?: Theme;
}) {
	const [theme, setThemeState] = useState<Theme>(defaultTheme);

	useEffect(() => {
		const saved = localStorage.getItem("theme") as Theme | null;
		if (saved === "dark" || saved === "light") setThemeState(saved);
	}, []);

	useEffect(() => {
		const root = document.documentElement;
		root.classList.remove("dark", "light");
		root.classList.add(theme);
	}, [theme]);

	function setTheme(t: Theme) {
		localStorage.setItem("theme", t);
		setThemeState(t);
	}

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}
