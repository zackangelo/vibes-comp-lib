export type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
	variant?: "primary" | "secondary" | "tertiary" | "ghost";
	size?: "large" | "medium" | "small" | "x-small" | "icon" | "icon-small";
	href: string;
};
