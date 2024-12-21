interface Props {
	className?: string;
	title?: string;
	products: CompareProduct[];
	addToCartLabel?: string;
	emptyStateMessage?: string;
	previousLabel?: string;
	nextLabel?: string;
	addToCartAction?: (id: string) => Promise<void>;
}
