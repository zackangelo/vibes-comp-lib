interface Review {
	id: string;
	rating: number;
	review: string;
	name: string;
	date: string;
}

interface Props {
	reviews: Streamable<Review[]>;
	averageRating: Streamable<number>;
	totalCount?: Streamable<number>;
	paginationInfo?: Streamable<CursorPaginationInfo>;
	emptyStateMessage?: string;
	reviewsLabel?: string;
}
