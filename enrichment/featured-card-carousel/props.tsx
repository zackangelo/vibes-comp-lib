interface Link {
	label: string;
	href: string;
}

interface Props {
	title: string;
	description?: string;
	cta?: Link;
	cards: Card[];
	scrollbarLabel?: string;
}
