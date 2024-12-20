export interface CardProduct {
	id: string;
	title: string;
	href: string;
	image?: { src: string; alt: string };
	price?: Price;
	subtitle?: string;
	badge?: string;
	rating?: number;
}

interface Props {
	className?: string;
	showCompare?: boolean;
	compareLabel?: string;
	compareParamName?: string;
	product: CardProduct;
}
