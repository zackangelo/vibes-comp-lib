export interface CursorPaginationInfo {
	startCursorParamName?: string;
	startCursor?: string | null;
	endCursorParamName?: string;
	endCursor?: string | null;
}

export interface Props {
	info: CursorPaginationInfo | Promise<CursorPaginationInfo>;
	scroll?: boolean;
}
