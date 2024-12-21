interface Props {
	title?: string;
	orders: Order[] | Promise<Order[]>;
	paginationInfo?: CursorPaginationInfo | Promise<CursorPaginationInfo>;
}
