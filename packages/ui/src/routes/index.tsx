import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-6 py-12">
			<div className="text-center space-y-2">
				<h1 className="text-4xl font-bold tracking-tight">Network Tools</h1>
				<p className="text-lg text-muted-foreground">
					ネットワーク系ツールサイト
				</p>
			</div>
			<p className="max-w-lg text-center text-muted-foreground">
				個人的に欲しいなと思ったネットワーク系のツールをいろいろ作ってまとめているサイト。
			</p>
			<Button variant="outline" asChild>
				<a
					href={siteConfig.links.github}
					target="_blank"
					rel="noopener noreferrer"
				>
					<GithubIcon className="size-4" />
					GitHub
				</a>
			</Button>
		</section>
	);
}
