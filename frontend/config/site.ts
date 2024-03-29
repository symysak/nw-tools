export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "SUYAMA Network Tools",
	description: "ネットワーク系ツールサイト",
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
		{
			label: "NAT64アドレス計算機",
			href: "/nat64-calculator",
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
			label: "NAT64アドレス計算機",
			href: "/nat64-calculator",
		},
	],
	links: {
		github: "https://github.com/symysak/nw-tools",
	},
};