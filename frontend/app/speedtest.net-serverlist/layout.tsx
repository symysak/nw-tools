import { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		default: "speedtest.netサーバ一覧",
        template: "%s",
	},
	description: "",
};

export default function AppLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
        <>{children}</>
	);
}