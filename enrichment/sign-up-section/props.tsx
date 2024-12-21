interface Props<F extends Field> {
	title?: string;
	action: DynamicFormAction<F>;
	fields: Array<F | FieldGroup<F>>;
	submitLabel?: string;
}
