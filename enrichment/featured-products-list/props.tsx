interface Link {
	label: string;
	href: string;
}

interface Props {
	title: string;
	description?: string;
	cta?: Link;
	products: Streamable<ListProduct[]>;
	emptyStateTitle?: Streamable<string | null>;
	emptyStateSubtitle?: Streamable<string | null>;
	placeholderCount?: number;
}