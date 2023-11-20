import { Metadata } from "next";
import { siteConfig } from "@/config/site";

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AppBarAndNavBar from '@/components/appBarAndNavBar';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};


export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja">
			<body>
				<ThemeRegistry>
					<AppBarAndNavBar />
					<Box
						component="main"
						sx={{
							flexGrow: 1,
							bgcolor: 'background.default',
							mt: ['48px', '56px', '64px'],
							p: 3,
						}}
					>
					{children}
					</Box>
				</ThemeRegistry>
			</body>
		</html>
	);
}
