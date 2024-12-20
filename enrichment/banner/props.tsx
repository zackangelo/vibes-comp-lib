export interface Props {
	id: string;
	children: ReactNode;
	hideDismiss?: boolean;
	className?: string;
	onDismiss?: () => void;
}
