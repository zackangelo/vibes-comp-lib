interface Option {
	label: string;
	value: string;
}

interface Props extends ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
	id?: string;
	label?: string;
	placeholder?: string;
	variant?: "round" | "rectangle";
	error?: string;
	options: Option[];
}
