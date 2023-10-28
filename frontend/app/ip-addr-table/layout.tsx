import { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		default: "IPアドレス個数表",
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