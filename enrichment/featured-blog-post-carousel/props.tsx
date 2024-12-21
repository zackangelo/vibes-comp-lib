interface Link {
	label: string;
	href: string;
}

interface Props {
	title?: string;
	cta?: Link;
	blogPosts: BlogPost[];
	scrollbarLabel?: string;
	previousLabel?: string;
	nextLabel?: string;
}
