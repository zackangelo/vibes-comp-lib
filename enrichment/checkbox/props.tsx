interface Props {
	id?: string;
	checked: boolean;
	// TODO: refactor props here
	setChecked?: (checked: boolean) => void;
	label?: React.ReactNode;
	error?: string;
	className?: string;
}
