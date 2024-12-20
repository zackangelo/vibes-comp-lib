export interface PriceRange {
	type: "range";
	minValue: string;
	maxValue: string;
}

export interface PriceSale {
	type: "sale";
	previousValue: string;
	currentValue: string;
}

export type Price = string | PriceRange | PriceSale;

interface Props {
	className?: string;
	price: Price;
}
