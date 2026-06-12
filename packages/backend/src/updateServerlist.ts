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

const getData = async (): Promise<SpeedtestServer[]> => {
	try {
		const res = await fetch(
			"https://www.speedtest.net/api/js/servers?search=japan&limit=100",
		);
		if (!res.ok) throw new Error("speedtest API error");
		return (await res.json()) as SpeedtestServer[];
	} catch {
		return [];
	}
};

const getUrl = async (url: string): Promise<string> => {
	try {
		const res = await fetch(url, { redirect: "follow" });
		return res.redirected ? res.url : "";
	} catch {
		return "";
	}
};

const processServer = async (server: SpeedtestServer, env: Env) => {
	const fqdn = server.url
		.replace("http://", "")
		.replace("https://", "")
		.replace(":8080/speedtest/upload.php", "");

	const [ipv4Addr, ipv6Addr, website] = await Promise.all([
		getIp(fqdn, 4),
		getIp(fqdn, 6),
		getUrl(
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
		host: `${fqdn}:8080`,
		ipv4: `${ipv4Info.ip}(${ipv4Info.hostname})`,
		ipv6: `${ipv6Info.ip}(${ipv6Info.hostname})`,
		ipv4_asn: ipv4Info.org,
		ipv6_asn: ipv6Info.org,
	};
};

export async function updateServerlist(env: Env): Promise<void> {
	const servers = await getData();
	const japanServers = servers.filter((s) => s.country === "Japan");

	const BATCH_SIZE = 10;
	const results = [];
	for (let i = 0; i < japanServers.length; i += BATCH_SIZE) {
		const batch = japanServers.slice(i, i + BATCH_SIZE);
		const batchResults = await Promise.all(
			batch.map((s) => processServer(s, env)),
		);
		results.push(...batchResults);
	}

	results.push({ lastupdated: new Date().toISOString() });
	await env.CACHE.put("serverlist", JSON.stringify(results));
}
