export interface FeaturedImageProps {
	title: string;
	description: string;
	image: {
		src: string;
		blurDataUrl?: string;
		alt: string;
	};
	cta: {
		href: string;
		label: string;
	};
	mediaAlign?: "left" | "right" | "full";
}
