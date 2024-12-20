export interface Props {
	id: string;
	author?: string | null;
	content: string;
	date: string;
	image?: {
		src: string;
		alt: string;
	};
	href: string;
	title: string;
	className?: string;
}
