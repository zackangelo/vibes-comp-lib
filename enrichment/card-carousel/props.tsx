export type Card = CardProps & {
	id: string;
};

interface Props {
	cards: Streamable<Card[]>;
	textContrast?: "light" | "dark";
	className?: string;
	emptyStateMessage?: string;
	scrollbarLabel?: string;
}
