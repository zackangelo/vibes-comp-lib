interface Props {
	breadcrumbs?: Streamable<Breadcrumb[]>;
	title?: Streamable<string | null>;
	totalCount: Streamable<number>;
	products: Streamable<ListProduct[]>;
	filters: Streamable<Filter[]>;
	sortOptions: Streamable<SortOption[]>;
	compareProducts?: Streamable<ListProduct[] | null>;
	paginationInfo?: Streamable<CursorPaginationInfo>;
	compareAction?: React.ComponentProps<"form">["action"];
	compareLabel?: string;
	filterLabel?: string;
	resetFiltersLabel?: string;
	sortLabel?: Streamable<string | null>;
	sortParamName?: string;
	sortDefaultValue?: string;
	compareParamName?: string;
	emptyStateSubtitle?: Streamable<string | null>;
	emptyStateTitle?: Streamable<string | null>;
	placeholderCount?: number;
}
