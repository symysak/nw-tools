export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Next.js + NextUI",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "IPアドレス個数表",
			href: "/ip-addr-table",
		},
		{
			label: "トンネルMTU計算機",
			href: "/mtu-calculator",
		},
		{
			label: "speedtest.netサーバリスト",
			href: "/speedtest.net-serverlist",
		},
	],
	navMenuItems: [
		{
			label: "IPアドレス個数表",
			href: "/ip-addr-table",
		},
		{
			label: "トンネルMTU計算機",
			href: "/mtu-calculator",
		},
		{
			label: "speedtest.netサーバリスト",
			href: "/speedtest.net-serverlist",
		},
		{
			label: "Logout",
			href: "/logout",
		},
	],
	links: {
		github: "https://github.com/symysak/nw-tools",
	},
};