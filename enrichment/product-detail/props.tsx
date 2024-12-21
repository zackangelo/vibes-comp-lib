interface ProductDetailProduct {
	id: string;
	title: string;
	href: string;
	images: Streamable<Array<{ src: string; alt: string }>>;
	price?: Streamable<Price | null>;
	subtitle?: string;
	badge?: string;
	rating?: Streamable<number | null>;
	summary?: Streamable<string>;
	description?: Streamable<string | React.ReactNode | null>;
	accordions?: Streamable<
		Array<{
			title: string;
			content: React.ReactNode;
		}>
	>;
}

interface Props<F extends Field> {
	breadcrumbs?: Streamable<Breadcrumb[]>;
	product: Streamable<ProductDetailProduct | null>;
	action: ProductDetailFormAction<F>;
	fields: Streamable<F[]>;
	quantityLabel?: string;
	incrementLabel?: string;
	decrementLabel?: string;
	ctaLabel?: Streamable<string | null>;
	ctaDisabled?: Streamable<boolean | null>;
	prefetch?: boolean;
	thumbnailLabel?: string;
}
