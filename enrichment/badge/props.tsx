export interface Props {
	children: ReactNode;
	variant?: "pill" | "rounded";
	color?: "primary" | "accent" | "warning" | "danger" | "success" | "info";
	className?: string;
}
