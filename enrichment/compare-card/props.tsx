export type CompareProduct = CardProduct & {
	description?: string;
	customFields?: { name: string; value: string }[];
};

export interface Props {
	className?: string;
	product: CompareProduct;
	addToCartLabel?: string;
	descriptionLabel?: string;
	ratingLabel?: string;
	otherDetailsLabel?: string;
	addToCartAction?: (id: string) => Promise<void>;
}
