export type CarouselProduct = CardProduct;

interface Props {
	products: Streamable<CarouselProduct[]>;
	className?: string;
	emptyStateTitle?: string;
	emptyStateSubtitle?: string;
}
