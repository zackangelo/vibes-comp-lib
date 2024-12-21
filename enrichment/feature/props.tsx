export interface FeatureProps {
	image: {
		src: string;
		alt: string;
	};
	title?: string;
	description?: string;
	grid?: Array<{
		icon: IconName;
		title: string;
		description: string;
	}>;
	cta: {
		href: string;
		label: string;
	};
}
