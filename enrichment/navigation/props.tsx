export interface Props<S extends SearchResult> {
	className?: string;
	isFloating?: boolean;
	accountHref: string;
	cartCount?: Streamable<number | null>;
	cartHref: string;
	links: Streamable<Link[]>;
	locales?: Locale[];
	activeLocaleId?: string;
	localeAction?: LocaleAction;
	logo?: Streamable<string | { src: string; alt: string } | null>;
	logoHref?: string;
	logoLabel?: string;
	searchHref: string;
	searchParamName?: string;
	searchAction?: SearchAction<S>;
	searchCtaLabel?: string;
	searchInputPlaceholder?: string;
	emptySearchTitle?: string;
	emptySearchSubtitle?: string;
	cartLabel?: string;
	accountLabel?: string;
	searchLabel?: string;
}
