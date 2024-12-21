type ButtonLinkProps = ComponentPropsWithoutRef<typeof ButtonLink>;

interface Slide {
	title: string;
	description?: string;
	showDescription?: boolean;
	image?: { alt: string; blurDataUrl?: string; src: string };
	cta?: {
		label: string;
		href: string;
		variant?: ButtonLinkProps["variant"];
		size?: ButtonLinkProps["size"];
		shape?: ButtonLinkProps["shape"];
	};
	showCta?: boolean;
}

interface Props {
	slides: Slide[];
	playOnInit?: boolean;
	interval?: number;
	className?: string;
}
