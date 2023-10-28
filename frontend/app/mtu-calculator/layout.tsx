import { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		default: "MTU計算機",
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