import {
	Outlet,
	createRootRoute,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "SUYAMA Network Tools" },
			{ name: "description", content: "ネットワーク系ツールサイト" },
		],
		links: [{ rel: "stylesheet", href: appCss }],
		scripts: [
			{
				children: `(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.add(t)})()`,
			},
		],
	}),
	shellComponent: Shell,
	component: RootLayout,
});

function Shell({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ja">
			<head>
				<HeadContent />
			</head>
			<body>
				<ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
				<Scripts />
			</body>
		</html>
	);
}

function RootLayout() {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-grow container mx-auto max-w-7xl px-6 py-8">
				<Outlet />
			</main>
			<footer className="flex items-center justify-center py-3 text-sm text-muted-foreground border-t">
				<span>© 2023 SUYAMA</span>
			</footer>
		</div>
	);
}
