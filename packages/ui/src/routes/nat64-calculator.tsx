import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/nat64-calculator")({
	component: Nat64Calculator,
});

function ipv4ToIpv6(ipv4: string, prefix: string): string {
	const parts = ipv4.split(".").map(Number);
	if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) {
		return "無効なIPv4アドレス";
	}
	const hex = parts.map((p) => p.toString(16).padStart(2, "0")).join("");
	const suffix = hex.slice(0, 4) + ":" + hex.slice(4);
	const base = prefix.endsWith("::")
		? prefix + suffix
		: prefix.replace(/:$/, "") + ":" + suffix;
	return base;
}

function ipv6ToIpv4AndPrefix(ipv6: string): { ipv4: string; prefix: string } {
	const parts = ipv6.split(":");
	if (parts.length < 3) return { ipv4: "無効なIPv6アドレス", prefix: "" };
	const lastTwo = parts.slice(-2).join("");
	if (lastTwo.length !== 8) return { ipv4: "変換できません", prefix: "" };
	const octets = [
		parseInt(lastTwo.slice(0, 2), 16),
		parseInt(lastTwo.slice(2, 4), 16),
		parseInt(lastTwo.slice(4, 6), 16),
		parseInt(lastTwo.slice(6, 8), 16),
	];
	const ipv4 = octets.join(".");
	const prefix = parts.slice(0, -2).join(":") + "::";
	return { ipv4, prefix };
}

function CopyButton({ text }: { text: string }) {
	return (
		<Button
			variant="ghost"
			size="icon-xs"
			onClick={() => navigator.clipboard.writeText(text)}
			aria-label="コピー"
		>
			<Copy />
		</Button>
	);
}

function Nat64Calculator() {
	const [ipv4, setIpv4] = useState("");
	const [prefix, setPrefix] = useState("64:ff9b::");
	const [ipv6Result, setIpv6Result] = useState("");

	const [ipv6, setIpv6] = useState("");
	const [ipv4Result, setIpv4Result] = useState("");
	const [prefixResult, setPrefixResult] = useState("");

	return (
		<div>
			<h1 className="text-xl font-semibold mb-4">NAT64アドレス計算機</h1>
			<p className="text-sm text-muted-foreground mb-4">
				NAT64のアドレスの変換ができます。
			</p>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<Card>
					<CardHeader>
						<CardTitle>IPv4 → IPv6</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="space-y-1">
							<Label>IPv4アドレス</Label>
							<Input
								value={ipv4}
								onChange={(e) => setIpv4(e.target.value)}
								placeholder="例: 192.0.2.1"
							/>
						</div>
						<div className="space-y-1">
							<Label>NAT64プレフィックス</Label>
							<Input
								value={prefix}
								onChange={(e) => setPrefix(e.target.value)}
							/>
						</div>
						<Button onClick={() => setIpv6Result(ipv4ToIpv6(ipv4, prefix))}>
							変換
						</Button>
						{ipv6Result && (
							<div className="flex items-center gap-1 mt-2">
								<span className="text-sm font-mono bg-muted px-2 py-1 rounded flex-1 break-all">
									{ipv6Result}
								</span>
								<CopyButton text={ipv6Result} />
							</div>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>IPv6 → IPv4</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="space-y-1">
							<Label>IPv6アドレス</Label>
							<Input
								value={ipv6}
								onChange={(e) => setIpv6(e.target.value)}
								placeholder="例: 64:ff9b::c000:201"
							/>
						</div>
						<Button
							onClick={() => {
								const result = ipv6ToIpv4AndPrefix(ipv6);
								setIpv4Result(result.ipv4);
								setPrefixResult(result.prefix);
							}}
						>
							変換
						</Button>
						{ipv4Result && (
							<div className="space-y-2 mt-2">
								<div className="flex items-center gap-1">
									<span className="text-sm text-muted-foreground w-28">
										IPv4アドレス:
									</span>
									<span className="text-sm font-mono bg-muted px-2 py-1 rounded flex-1">
										{ipv4Result}
									</span>
									<CopyButton text={ipv4Result} />
								</div>
								<div className="flex items-center gap-1">
									<span className="text-sm text-muted-foreground w-28">
										プレフィックス:
									</span>
									<span className="text-sm font-mono bg-muted px-2 py-1 rounded flex-1">
										{prefixResult}
									</span>
									<CopyButton text={prefixResult} />
								</div>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
