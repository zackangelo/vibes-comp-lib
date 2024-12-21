interface Props {
	title: string;
	description?: string;
	posts: Streamable<BlogPost[]>;
	paginationInfo?: Streamable<CursorPaginationInfo>;
	breadcrumbs?: Streamable<Breadcrumb[]>;
}
