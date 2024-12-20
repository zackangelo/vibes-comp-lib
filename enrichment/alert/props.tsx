interface Props {
	variant: "success" | "warning" | "error" | "info";
	message: ReactNode;
	description?: string;
	dismissLabel?: string;
	action?: {
		label: string;
		onClick: () => void;
	};
	onDismiss?: () => void;
}
