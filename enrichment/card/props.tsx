export interface Props {
	className?: string;
	title: string;
	image?: { src: string; alt: string };
	href: string;
	textContrast?: "light" | "dark";
}
