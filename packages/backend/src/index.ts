import { Hono } from "hono";
import { cors } from "hono/cors";
import { updateServerlist } from "./updateServerlist";

type Env = {
	CACHE: KVNamespace;
	IPINFOIO_API_TOKEN: string;
	IPINFOIO_API_URL: string;
};

const app = new Hono<{ Bindings: Env }>();

app.use(
	"*",
	cors({
		origin: "https://nw-tools.suyama.ne.jp",
		credentials: true,
	}),
);

app.get("/api", (c) => c.json({ message: "It's working!" }));

app.get("/api/serverlist", async (c) => {
	const cached = await c.env.CACHE.get("serverlist");
	if (!cached) {
		return c.json(
			{ message: "No data available. Please wait for the next cron job." },
			503,
		);
	}
	return c.json(JSON.parse(cached));
});

export default {
	fetch: app.fetch,
	async scheduled(_event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
		ctx.waitUntil(updateServerlist(env));
	},
};
