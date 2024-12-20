export type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "secondary" | "tertiary" | "ghost";
	size?: "large" | "medium" | "small" | "x-small" | "icon" | "icon-small";
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	loading?: boolean;
	type?: "button" | "submit" | "reset";
};
