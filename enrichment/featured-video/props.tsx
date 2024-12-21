interface Props {
	title: string;
	description: string;
	video: string;
	cta: {
		href: string;
		label: string;
	};
	mediaAlign?: "left" | "right" | "full";
}
