export interface CartLineItem {
	id: string;
	image: { alt: string; src: string };
	title: string;
	subtitle: string;
	quantity: number;
	price: string;
}

interface CartSummary {
	title?: string;
	caption?: string;
	subtotalLabel?: string;
	subtotal: string | Promise<string>;
	shippingLabel?: string;
	shipping?: string;
	taxLabel?: string;
	tax?: string | Promise<string>;
	grandTotalLabel?: string;
	grandTotal?: string | Promise<string>;
	ctaLabel?: string;
}

interface CartEmptyState {
	title: string;
	subtitle: string;
	cta: {
		label: string;
		href: string;
	};
}

interface CartState<LineItem extends CartLineItem> {
	lineItems: LineItem[];
	lastResult: SubmissionResult | null;
}

interface CartProps<LineItem extends CartLineItem> {
	title?: string;
	lineItems: LineItem[] | Promise<LineItem[]>;
	summary: CartSummary;
	emptyState: CartEmptyState;
	lineItemAction: Action<CartState<LineItem>, FormData>;
	checkoutAction: Action<SubmissionResult | null, FormData>;
	deleteLineItemLabel?: string;
	decrementLineItemLabel?: string;
	incrementLineItemLabel?: string;
}
