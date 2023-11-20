import NextLink from "next/link";
import Link from '@mui/material/Link';
import { siteConfig } from "@/config/site";
import { Typography } from "@mui/material";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<Typography variant="h1">Network Tools</Typography>
				<Typography variant="body1">
					ネットワーク系ツールサイト
				</Typography>
			</div>
			<Typography variant="body2">
				個人的に欲しいなと思ったネットワーク系のツールをいろいろ作ってまとめているサイト。
			</Typography>
			<div className="flex gap-3">
				<NextLink href={siteConfig.links.github} legacyBehavior>
					<Link>GitHub</Link>
				</NextLink>
			</div>

		</section>
	);
}