interface SpeedtestServer {
	id: number;
	sponsor: string;
	name: string;
	url: string;
	country: string;
}

interface IpInfo {
	ip: string;
	hostname: string;
	org: string;
}

type Env = {
	CACHE: KVNamespace;
	IPINFOIO_API_TOKEN: string;
	IPINFOIO_API_URL: string;
};

const SPEEDTEST_API_URL =
	"https://www.speedtest.net/api/js/servers?search=japan&limit=100";
const BATCH_SIZE = 3;

const getIp = async (host: string, family: 4 | 6): Promise<string> => {
	const type = family === 4 ? "A" : "AAAA";
	try {
		const res = await fetch(
			`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(host)}&type=${type}`,
			{ headers: { Accept: "application/dns-json" } },
		);
		if (!res.ok) return "error";
		const data = (await res.json()) as { Answer?: Array<{ data: string }> };
		return data.Answer?.[0]?.data ?? "error";
	} catch {
		return "error";
	}
};

const ipInfo = async (ip: string, env: Env): Promise<IpInfo> => {
	if (ip === "error") return { ip: "無し", hostname: "無し", org: "無し" };
	try {
		const res = await fetch(
			`${env.IPINFOIO_API_URL}${ip}?token=${env.IPINFOIO_API_TOKEN}`,
		);
		if (!res.ok) throw new Error(`ipinfo error: ${res.status}`);
		const json = (await res.json()) as {
			ip: string;
			hostname?: string;
			org?: string;
		};
		return {
			ip: json.ip,
			hostname: json.hostname ?? "無し",
			org: json.org ?? "無し",
		};
	} catch {
		return { ip: "API-error", hostname: "API-error", org: "API-error" };
	}
};

const fetchServers = async (): Promise<SpeedtestServer[]> => {
	const res = await fetch(SPEEDTEST_API_URL);
	if (!res.ok)
		throw new Error(`speedtest API error: ${res.status} ${await res.text()}`);
	return (await res.json()) as SpeedtestServer[];
};

const resolveRedirect = async (url: string): Promise<string> => {
	for (let attempt = 0; attempt < 3; attempt++) {
		try {
			const res = await fetch(url, { redirect: "manual" });
			const location = res.headers.get("Location");
			if (location) return new URL(location, url).href;
			// リダイレクトなしの正常応答は再試行しても変わらない
			if (res.status < 500) return "";
		} catch {
			// ネットワークエラーは再試行
		}
	}
	return "";
};

const processServer = async (server: SpeedtestServer, env: Env) => {
	let host: string;
	try {
		host = new URL(server.url).hostname;
	} catch {
		return null;
	}

	const [ipv4Addr, ipv6Addr, website] = await Promise.all([
		getIp(host, 4),
		getIp(host, 6),
		resolveRedirect(
			`https://www.speedtest.net/api/js/perform-redirect?server_id=${server.id}`,
		),
	]);

	const [ipv4Info, ipv6Info] = await Promise.all([
		ipInfo(ipv4Addr, env),
		ipInfo(ipv6Addr, env),
	]);

	return {
		id: server.id,
		name: server.sponsor,
		location: server.name,
		website,
		host: `${host}:8080`,
		ipv4: `${ipv4Info.ip}(${ipv4Info.hostname})`,
		ipv6: `${ipv6Info.ip}(${ipv6Info.hostname})`,
		ipv4_asn: ipv4Info.org,
		ipv6_asn: ipv6Info.org,
	};
};

export async function updateServerlist(env: Env): Promise<void> {
	let servers: SpeedtestServer[] = [];
	try {
		servers = await fetchServers();
	} catch (e) {
		await env.CACHE.put(
			"serverlist_error",
			JSON.stringify({
				time: new Date().toISOString(),
				error: e instanceof Error ? e.message : String(e),
			}),
		);
		return;
	}

	const japanServers = servers.filter((s) => s.country === "Japan");

	try {
		const results = [];
		for (let i = 0; i < japanServers.length; i += BATCH_SIZE) {
			const batch = japanServers.slice(i, i + BATCH_SIZE);
			const batchResults = await Promise.all(
				batch.map((s) => processServer(s, env)),
			);
			results.push(...batchResults.filter((r) => r !== null));
		}

		results.push({ lastupdated: new Date().toISOString() });
		await env.CACHE.put("serverlist", JSON.stringify(results));
	} catch (e) {
		await env.CACHE.put(
			"serverlist_error",
			JSON.stringify({
				time: new Date().toISOString(),
				error: e instanceof Error ? e.message : String(e),
			}),
		);
	}
}
