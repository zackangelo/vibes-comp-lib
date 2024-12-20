export interface Props {
	isOpen: boolean;
	setOpen: (open: boolean) => void;
	trigger: ReactNode;
	content: ReactNode;
}
