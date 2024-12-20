export type ListProduct = CardProduct;

interface Props {
	products: Streamable<ListProduct[]>;
	compareProducts?: Streamable<ListProduct[] | null>;
	className?: string;
	showCompare?: boolean;
	compareAction?: React.ComponentProps<"form">["action"];
	compareLabel?: string;
	compareParamName?: string;
}
