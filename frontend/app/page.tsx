import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Network Tools</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					ネットワーク系ツールサイト
				</h2>
			</div>
			<p>
                個人的に欲しいなと思ったネットワーク系のツールをいろいろ作ってまとめているサイト。
            </p>
			<div className="flex gap-3">
				<Link
					isExternal
					as={NextLink}
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					href={siteConfig.links.github}
				>
					<GithubIcon size={20} />
					GitHub
				</Link>
			</div>

		</section>
	);
}