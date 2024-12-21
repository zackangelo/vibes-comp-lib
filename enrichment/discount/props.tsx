interface DiscountType {
	label: string;
	code: string;
}

interface Props {
	backgroundImage: string;
	discounts: DiscountType[];
}
